# liqpay-nestjs

NestJS module for LiqPay payments with typed request builders, signed checkout payload generation, webhook callback parsing, and payment status lookups.

## Features

- NestJS module with `forRoot` and `forRootAsync`
- `LiqpayService` with `payments` and `webhooks` helpers
- Signed builders for `pay`, `hold`, and `subscribe` checkout flows
- HTML pay button generation with LiqPay SDK markup
- Zod schemas and TypeScript types exported from the package root
- Callback signature verification and camelCase response parsing

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

### Use `LiqpayService`

```ts
import { Body, Controller, Get, Param, Post } from '@nestjs/common'
import { CheckoutInput, LiqPayEnvelope, LiqpayService } from 'liqpay-nestjs'

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

		const checkout = this.liqpay.payments.pay(payload)

		return {
			url: checkout.url,
			data: checkout.data,
			signature: checkout.signature,
		}
	}

	@Get(':orderId/status')
	getStatus(@Param('orderId') orderId: string) {
		return this.liqpay.payments.getPaymentStatus(orderId)
	}

	@Post('webhook')
	async webhook(@Body() envelope: LiqPayEnvelope) {
		return await this.liqpay.webhooks.parseCheckoutCallback(envelope)
	}
}
```

## Typical Flow

1. Register `LiqPayModule` with your keys and optional default callback URLs.
2. Build a checkout payload with `liqpay.payments.pay(...)`, `hold(...)`, or `subscribe(...)`.
3. Redirect the user to the returned `url`, or render your own form using `data` and `signature`.
4. Receive the LiqPay callback envelope at your `serverUrl` endpoint.
5. Parse the callback with `liqpay.webhooks.parseCheckoutCallback(...)`.
6. Confirm the final state later with `liqpay.payments.getPaymentStatus(orderId)` if needed.

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

| Method                                             | Purpose                                                  | Return type                                                          |
| -------------------------------------------------- | -------------------------------------------------------- | -------------------------------------------------------------------- |
| `pay(payload)`                                     | Builds a signed checkout payload for a standard payment. | `CheckoutRequest & { url: string; data: string; signature: string }` |
| `hold(payload)`                                    | Builds a signed checkout payload for a hold operation.   | `CheckoutRequest & { url: string; data: string; signature: string }` |
| `subscribe(payload)`                               | Builds a signed checkout payload for recurring payments. | `CheckoutRequest & { url: string; data: string; signature: string }` |
| `getPayButton(payload, buttonText?, buttonColor?)` | Returns HTML for a LiqPay pay button.                    | `string`                                                             |
| `getPaymentStatus(orderId)`                        | Calls the LiqPay status API.                             | `Promise<Result<PaymentStatusResponse>>`                             |

### `payments.pay(payload)`

Use `pay(...)` for a normal payment flow.

```ts
import { CheckoutInput } from 'liqpay-nestjs'

const payload: CheckoutInput = {
	amount: 100,
	currency: 'UAH',
	description: 'Order #123',
	orderId: 'order-123',
}

const checkout = liqpay.payments.pay(payload)

console.log(checkout.url)
console.log(checkout.data)
console.log(checkout.signature)
```

Returned fields:

- `url`: ready-to-use LiqPay checkout URL
- `data`: Base64-encoded request payload
- `signature`: request signature generated from your private key
- all resolved request fields including `action`, `version`, `publicKey`, and inherited `resultUrl` / `serverUrl`

### `payments.hold(payload)`

`hold(...)` has the same return shape as `pay(...)`, but the generated request uses action `hold`.

```ts
const holdCheckout = liqpay.payments.hold({
	amount: 100,
	currency: 'UAH',
	description: 'Funds hold for order #123',
	orderId: 'order-123',
})
```

### `payments.subscribe(payload)`

`subscribe(...)` has the same return shape as `pay(...)`, but builds a subscription request. Subscription-related fields still come from your `CheckoutInput`.

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

### `payments.getPayButton(payload, buttonText?, buttonColor?)`

Returns an HTML string containing a form and LiqPay `sdk-button` markup for the `pay` action.

```ts
const html = liqpay.payments.getPayButton(
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

### `payments.getPaymentStatus(orderId)`

Calls LiqPay's status API and returns `Promise<Result<PaymentStatusResponse>>`.

```ts
const result = await liqpay.payments.getPaymentStatus('order-123')

if (result.error) {
	console.error(result.error.code, result.error.description)
} else {
	console.log(result.data.status)
	console.log(result.data.amount)
	console.log(result.data.orderId)
}
```

This is the only payments helper that performs an HTTP request.

## Webhooks API

`LiqpayService.webhooks.parseCheckoutCallback(envelope)` validates the callback signature, decodes the Base64 payload, and parses it into `Promise<Result<CheckoutCallback>>`.

```ts
import { Body, Controller, Post } from '@nestjs/common'
import { LiqPayEnvelope, LiqpayService } from 'liqpay-nestjs'

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

The envelope shape is:

```ts
type LiqPayEnvelope = {
	data: string
	signature: string
}
```

## Checkout Types

The checkout flow exposes three related types.

| Type                 | Purpose                                                                                            |
| -------------------- | -------------------------------------------------------------------------------------------------- |
| `CheckoutInput`      | The consumer-facing payload you pass into `pay`, `hold`, `subscribe`, or `getPayButton`.           |
| `CheckoutRequest`    | The enriched request after the library injects `action`, `version`, `publicKey`, and default URLs. |
| `RawCheckoutRequest` | The final wire-format payload sent to LiqPay after snake_case and value transformations.           |

In most applications you should create `CheckoutInput` values and let the library build the rest.

### Minimal `CheckoutInput`

```ts
import { CheckoutInput } from 'liqpay-nestjs'

const payload: CheckoutInput = {
	amount: 100,
	currency: 'UAH',
	description: 'Order #123',
	orderId: 'order-123',
}
```

### Advanced `CheckoutInput` fields

The public checkout input supports many LiqPay options, including:

- `resultUrl`, `serverUrl`
- `paytypes`, `language`, `expiredDate`
- `cardToken`, `customer`, `customerUserId`, `recurringByToken`
- `subscribe`, `subscribeDateStart`, `subscribePeriodicity`
- `fiscalData`, `detailAddenda`, `splitRules`
- sender metadata such as `senderFirstName`, `senderLastName`, `senderAddress`, and `senderCountryCode`
- product metadata such as `productName`, `productDescription`, `productCategory`, and `productUrl`

## Request and Response Normalization

The library keeps the application-facing API mostly in camelCase and handles LiqPay's transport format internally.

- Top-level request fields use names like `orderId`, `resultUrl`, `serverUrl`, `verifyCode`, `fiscalData`, and `detailAddenda`.
- Outgoing requests are serialized into LiqPay's expected field format.
- Checkout callbacks and payment status responses are transformed back into camelCase.
- Several values such as dates, booleans, and enum-backed fields are normalized during parsing.
- Some nested helper objects still use provider-specific field names defined by their exported schemas.

## Schemas and Types

All public schemas and types are exported from the package root.

```ts
import {
	CheckoutCallback,
	CheckoutCallbackSchema,
	CheckoutInput,
	CheckoutInputSchema,
	LiqPayEnvelope,
	LiqPayEnvelopeSchema,
	PaymentStatusResponse,
	PaymentStatusResponseSchema,
	Result,
} from 'liqpay-nestjs'
```

Main export groups:

- base: `LiqPayEnvelope`, `LiqPayEnvelopeSchema`, `Result<T>`, request and response unions
- checkout: `CheckoutInput`, `CheckoutInputSchema`, `CheckoutRequest`, `CheckoutCallback`, and raw request helpers
- payment status: `PaymentStatusRequest`, `PaymentStatusRequestSchema`, `PaymentStatusResponse`, `PaymentStatusResponseSchema`
- common: fiscal, split, and addenda schemas and their types
- enums: action, currency, language, paytype, version, payment status, and related schema exports
- error: LiqPay error response and error code schemas and types
- nest: `LiqPayModule`, `LiqpayService`, `LiqPayOptions`, `LiqPayAsyncOptions`, `LIQPAY_OPTIONS`

### Validate controller input with the exported schemas

```ts
import { CheckoutInputSchema } from 'liqpay-nestjs'

const payload = CheckoutInputSchema.parse(input)
const checkout = liqpay.payments.pay(payload)
```

## Result Contract and Error Handling

Methods that parse LiqPay responses return this shape:

```ts
type Result<T> =
	| { data: T; error?: null }
	| { data: null; error: { code: string; description: string } }
```

This applies to:

- `liqpay.payments.getPaymentStatus(...)`
- `liqpay.webhooks.parseCheckoutCallback(...)`

Possible error sources include:

- LiqPay provider errors parsed from `err_code` and `err_description`
- invalid callback signatures
- Base64 decode failures
- invalid JSON responses
- schema validation failures
- HTTP transport failures

Always check `result.error` before using `result.data`.

## Advanced Nest Exports

The package root also exports:

- `LIQPAY_OPTIONS`
- `createLiqpayOptionsProvider(...)`
- `createLiqpayAsyncOptionsProvider(...)`

These are useful if you want to build custom providers around the package token instead of using `LiqPayModule` directly.

## Build

```bash
npm run build
```
