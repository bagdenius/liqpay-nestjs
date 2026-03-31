# liqpay-nestjs

NestJS module for LiqPay payments with typed request models, signed checkout payload generation, webhook callback parsing, and payment status lookups.

## Features

- NestJS module with `forRoot` and `forRootAsync`
- `LiqpayService` with `payments` and `webhooks` helpers
- Signed checkout builders for standard payment, hold, and subscription flows
- HTML checkout button generation with LiqPay SDK markup
- Typed payment status requests and normalized responses
- TypeScript types exported from the package root

## Requirements

- Node.js `>= 18`
- `@nestjs/common` `^10 || ^11`
- `@nestjs/core` `^10 || ^11`

## Installation

```bash
npm install liqpay-nestjs
```

## Quick Start

### Register the module

```ts
import { Module } from '@nestjs/common'
import { LiqPayModule } from 'liqpay-nestjs'

@Module({
	imports: [
		LiqPayModule.forRoot({
			publicKey: process.env.LIQPAY_PUBLIC_KEY!,
			privateKey: process.env.LIQPAY_PRIVATE_KEY!,
			resultUrl: 'https://example.com/payments/result',
			serverUrl: 'https://example.com/payments/webhook',
			isGlobal: true,
		}),
	],
})
export class AppModule {}
```

### Register asynchronously

```ts
import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { LiqPayModule } from 'liqpay-nestjs'

@Module({
	imports: [
		ConfigModule.forRoot(),
		LiqPayModule.forRootAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: (config: ConfigService) => ({
				publicKey: config.getOrThrow<string>('LIQPAY_PUBLIC_KEY'),
				privateKey: config.getOrThrow<string>('LIQPAY_PRIVATE_KEY'),
				resultUrl: config.get<string>('LIQPAY_RESULT_URL'),
				serverUrl: config.get<string>('LIQPAY_SERVER_URL'),
				isGlobal: true,
			}),
		}),
	],
})
export class AppModule {}
```

### Inject and use `LiqpayService`

```ts
import { Body, Controller, Get, Post, Query } from '@nestjs/common'
import { LiqpayService } from 'liqpay-nestjs'
import type {
	CheckoutInput,
	LiqPayEnvelope,
	PaymentStatusInput,
} from 'liqpay-nestjs'

@Controller('payments')
export class PaymentsController {
	constructor(private readonly liqpay: LiqpayService) {}

	@Post('checkout')
	createCheckout() {
		const payload: CheckoutInput = {
			amount: 199,
			currency: 'UAH',
			description: 'Order #123',
			orderId: 'order-123',
		}

		const checkout = this.liqpay.payments.getCheckoutUrl(payload)

		return {
			url: checkout.url,
			data: checkout.data,
			signature: checkout.signature,
		}
	}

	@Get('status')
	getStatus(@Query('orderId') orderId: string) {
		const payload: PaymentStatusInput = { orderId }
		return this.liqpay.payments.getStatus(payload)
	}

	@Post('webhook')
	async webhook(@Body() envelope: LiqPayEnvelope) {
		return await this.liqpay.webhooks.parseCheckoutCallback(envelope)
	}
}
```

## Typical Flow

1. Register `LiqPayModule` with your public and private keys.
2. Build a checkout payload with `liqpay.payments.getCheckoutUrl(...)`, `hold(...)`, or `subscribe(...)`.
3. Redirect the customer to `result.url` or render the returned button HTML.
4. Receive the LiqPay callback envelope at your `serverUrl` endpoint.
5. Parse the callback with `liqpay.webhooks.parseCheckoutCallback(...)`.
6. Query the current state later with `liqpay.payments.getStatus({ orderId })` when needed.

## Configuration

`LiqPayModule.forRoot(...)` and `LiqPayModule.forRootAsync(...)` both use the same options shape.

| Option       | Type      | Required | Description                                                                            |
| ------------ | --------- | -------- | -------------------------------------------------------------------------------------- |
| `publicKey`  | `string`  | Yes      | LiqPay public key.                                                                     |
| `privateKey` | `string`  | Yes      | LiqPay private key used for signing requests.                                          |
| `resultUrl`  | `string`  | No       | Default redirect URL after checkout. Can be overridden per checkout payload.           |
| `serverUrl`  | `string`  | No       | Default callback URL for LiqPay notifications. Can be overridden per checkout payload. |
| `isGlobal`   | `boolean` | No       | Registers the Nest module as global when `true`. Defaults to `false`.                  |

The async registration provider validates the resolved options and throws if `publicKey` or `privateKey` are missing or not strings.

## Payments API

`LiqpayService.payments` exposes five methods.

| Method                                                  | Purpose                                                     | Notes                                           |
| ------------------------------------------------------- | ----------------------------------------------------------- | ----------------------------------------------- |
| `getCheckoutUrl(payload)`                               | Builds a signed standard checkout payload.                  | Returns a full result object, not only the URL. |
| `hold(payload)`                                         | Builds a signed checkout payload with action `hold`.        | Local builder, no HTTP call.                    |
| `subscribe(payload)`                                    | Builds a signed checkout payload with action `subscribe`.   | Local builder, no HTTP call.                    |
| `getCheckoutButton(payload, buttonText?, buttonColor?)` | Returns LiqPay checkout HTML for the standard payment flow. | Uses action `pay`.                              |
| `getStatus(payload)`                                    | Calls LiqPay status API.                                    | Expects `PaymentStatusInput`.                   |

### `payments.getCheckoutUrl(payload)`

Use this for a normal checkout flow.

```ts
import type { CheckoutInput } from 'liqpay-nestjs'

const payload: CheckoutInput = {
	amount: 100,
	currency: 'UAH',
	description: 'Order #123',
	orderId: 'order-123',
}

const checkout = liqpay.payments.getCheckoutUrl(payload)

console.log(checkout.url)
console.log(checkout.data)
console.log(checkout.signature)
```

Despite the method name, the return value is a signed checkout object containing:

- `url`: ready-to-use LiqPay redirect URL
- `data`: Base64-encoded request payload
- `signature`: signature generated from your private key
- the resolved checkout fields such as `action`, `version`, `publicKey`, and inherited `resultUrl` / `serverUrl`

### `payments.hold(payload)`

Builds the same signed result shape as `getCheckoutUrl(...)`, but with action `hold`.

```ts
const holdCheckout = liqpay.payments.hold({
	amount: 100,
	currency: 'UAH',
	description: 'Funds hold for order #123',
	orderId: 'order-123',
})
```

### `payments.subscribe(payload)`

Builds the same signed result shape as `getCheckoutUrl(...)`, but with action `subscribe`.

```ts
const subscriptionCheckout = liqpay.payments.subscribe({
	amount: 250,
	currency: 'UAH',
	description: 'Monthly subscription',
	orderId: 'subscription-123',
	subscribe: true,
	subscribeDateStart: new Date('2026-04-01T00:00:00Z'),
	subscribePeriodicity: 'month',
})
```

### `payments.getCheckoutButton(payload, buttonText?, buttonColor?)`

Returns an HTML string containing a form and LiqPay `sdk-button` markup for the standard payment flow.

```ts
const html = liqpay.payments.getCheckoutButton(
	{
		amount: 100,
		currency: 'UAH',
		description: 'Order #123',
		orderId: 'order-123',
	},
	'Pay now',
	'#1f9d55',
)
```

Defaults:

- `buttonText`: `Pay`
- `buttonColor`: `#77CC5D`

### `payments.getStatus(payload)`

Calls LiqPay's status API and returns `Promise<Result<PaymentStatusResponse>>`.

```ts
import type { PaymentStatusInput } from 'liqpay-nestjs'

const payload: PaymentStatusInput = { orderId: 'order-123' }
const result = await liqpay.payments.getStatus(payload)

if (result.error) {
	console.error(result.error.code, result.error.description)
} else {
	console.log(result.data.status)
	console.log(result.data.amount)
	console.log(result.data.orderId)
}
```

This is the only payments helper that performs an HTTP request. The library fills `action: 'status'`, `version: 7`, and your configured `publicKey` automatically.

## Webhooks API

`LiqpayService.webhooks.parseCheckoutCallback(envelope)` validates the callback signature, decodes the Base64 payload, and parses it into `Promise<Result<CheckoutCallback>>`.

```ts
import { Body, Controller, Post } from '@nestjs/common'
import { LiqpayService } from 'liqpay-nestjs'
import type { LiqPayEnvelope } from 'liqpay-nestjs'

@Controller('payments')
export class WebhookController {
	constructor(private readonly liqpay: LiqpayService) {}

	@Post('webhook')
	async handleWebhook(@Body() envelope: LiqPayEnvelope) {
		const result = await this.liqpay.webhooks.parseCheckoutCallback(envelope)

		if (result.error) {
			return { ok: false, error: result.error }
		}

		return { ok: true, callback: result.data }
	}
}
```

`LiqPayEnvelope` is the callback wrapper sent by LiqPay:

```ts
type LiqPayEnvelope = {
	data: string
	signature: string
}
```

## Checkout Types

For library consumers, the main checkout type is `CheckoutInput`.

```ts
import type { CheckoutInput } from 'liqpay-nestjs'

const payload: CheckoutInput = {
	amount: 100,
	currency: 'UAH',
	description: 'Order #123',
	orderId: 'order-123',
}
```

Useful optional fields include:

- `resultUrl`, `serverUrl`
- `paytypes`, `language`, `expiredDate`
- `verifyCode`
- `fiscalData`, `splitRules`, `detailAddenda`
- `customer`, `customerUserId`, `recurringByToken`
- `subscribe`, `subscribeDateStart`, `subscribePeriodicity`
- sender metadata such as `senderFirstName`, `senderLastName`, `senderAddress`, and `senderCountryCode`
- product metadata such as `productName`, `productDescription`, `productCategory`, and `productUrl`

The source repository keeps the full request and response models under `src/core/types` if you need exact field-level reference.

## Type Exports

The package root exports TypeScript types for request and response modeling, for example:

```ts
import type {
	CheckoutCallback,
	CheckoutInput,
	LiqPayEnvelope,
	LiqPayError,
	PaymentStatusInput,
	PaymentStatusResponse,
	Result,
} from 'liqpay-nestjs'
```

It also exports these runtime values:

- `LiqPayModule`
- `LiqpayService`
- `LIQPAY_OPTIONS`
- `UnitEnum`

Note: the package root currently exports types, not Zod schema values. The schema implementations live in the source under `src/core/types`.

## Result Contract and Error Handling

Methods that parse LiqPay responses return this shape:

```ts
type Result<T> =
	| { data: T; error?: null }
	| { data: null; error: { code: string; description: string } }
```

This applies to:

- `liqpay.payments.getStatus(...)`
- `liqpay.webhooks.parseCheckoutCallback(...)`

Errors can come from:

- LiqPay API error responses
- invalid callback signatures
- Base64 decode failures
- invalid JSON responses
- response validation failures
- HTTP transport failures

Always check `result.error` before using `result.data`.

## Nest Exports

The package root exports:

- `LiqPayModule`
- `LiqpayService`
- `LIQPAY_OPTIONS`
- `LiqPayOptions`
- `LiqPayAsyncOptions`

## Build

```bash
npm run build
```
