# liqpay-nestjs (for version<0.3.0)

NestJS module for LiqPay payments with DI-friendly configuration, signed checkout helpers, typed request and response models, and webhook callback parsing.

## Features

- NestJS module with `forRoot` and `forRootAsync`
- `LiqpayService` with payment and webhook helpers
- Signed checkout URL and checkout form generation
- Typed payment status requests
- Callback signature validation and payload parsing
- Exported Zod schemas and TypeScript types from the package root

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

### Register the module asynchronously

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
import { Controller, Get, Query } from '@nestjs/common'
import { CheckoutRequest, LiqpayService } from 'liqpay-nestjs'

@Controller('payments')
export class PaymentsController {
	constructor(private readonly liqpay: LiqpayService) {}

	@Get('checkout-url')
	getCheckoutUrl(@Query('orderId') orderId: string) {
		const payload: CheckoutRequest = {
			action: 'pay',
			amount: 199,
			currency: 'UAH',
			description: 'Order payment',
			orderId,
		}

		return {
			url: this.liqpay.payments.getCheckoutUrl(payload),
		}
	}
}
```

## Typical Flow

1. Register `LiqPayModule` with your public and private keys.
2. Create a checkout URL or checkout form from a `CheckoutRequest`.
3. Point `serverUrl` to a Nest endpoint that receives the LiqPay callback envelope.
4. Parse the callback with `liqpay.webhooks.parseCheckoutCallback(...)`.
5. Optionally confirm the final state with `liqpay.payments.getPaymentStatus(orderId)`.

## Configuration

Both `LiqPayModule.forRoot(...)` and `LiqPayModule.forRootAsync(...)` resolve to the same options shape.

| Option       | Type      | Required | Description                                                                          |
| ------------ | --------- | -------- | ------------------------------------------------------------------------------------ |
| `publicKey`  | `string`  | Yes      | LiqPay public key.                                                                   |
| `privateKey` | `string`  | Yes      | LiqPay private key used for request signing.                                         |
| `resultUrl`  | `string`  | No       | Default redirect URL after checkout. Can be overridden per request.                  |
| `serverUrl`  | `string`  | No       | Default callback URL for LiqPay server notifications. Can be overridden per request. |
| `isGlobal`   | `boolean` | No       | Registers the Nest module as global when set to `true`. Defaults to `false`.         |

The async registration path validates the resolved options at runtime and throws if `publicKey` or `privateKey` are missing or not strings.

## LiqpayService API

`LiqpayService` exposes two sub-services:

- `payments`
- `webhooks`

### `payments.getCheckoutUrl(payload)`

Builds a signed LiqPay checkout URL.

```ts
const url = liqpay.payments.getCheckoutUrl({
	action: 'pay',
	amount: 100,
	currency: 'UAH',
	description: 'Order #123',
	orderId: 'order-123',
})
```

Notes:

- This is a pure helper and does not perform an HTTP request.
- The library signs the payload with the configured private key.
- `version` is always sent as `7`.
- `resultUrl` and `serverUrl` fall back to module-level defaults if omitted from the payload.

### `payments.getCheckoutForm(payload, buttonText?, buttonColor?)`

Returns an HTML form string with LiqPay's `sdk-button` widget.

```ts
const html = liqpay.payments.getCheckoutForm(
	{
		action: 'pay',
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

### `payments.create(payload)`

Returns the normalized checkout payload together with the generated `checkoutUrl`.

```ts
const checkout = liqpay.payments.create({
	action: 'pay',
	amount: 100,
	currency: 'UAH',
	description: 'Order #123',
	orderId: 'order-123',
})

console.log(checkout.checkoutUrl)
```

Use this when you want both the prepared payload and the final redirect URL without making a network call.

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

You only pass `orderId`; the library builds the `status` request internally.

### `webhooks.parseCheckoutCallback(envelope)`

Validates the callback signature, decodes the Base64 payload, and parses it into `Promise<Result<CheckoutCallback>>`.

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

The expected envelope shape is:

```ts
type LiqPayEnvelope = {
	data: string
	signature: string
}
```

## Request and Response Normalization

The library normalizes the most common application-facing models and handles LiqPay's wire format for you.

- Top-level checkout and status request fields use the expected TypeScript property names, for example `orderId`, `resultUrl`, `serverUrl`, and `senderFirstName`.
- Some nested LiqPay-specific helper objects keep the exact field names defined by their exported schemas. When in doubt, validate against the schema you are using.
- Outgoing requests are serialized into the format LiqPay expects.
- Callback and status responses are transformed back to camelCase.
- Dates, booleans, and several enum-backed fields are normalized where possible.
- Checkout signing always uses the module's configured public and private keys.

## Minimal Checkout Payload

The smallest useful `CheckoutRequest` usually looks like this:

```ts
import { CheckoutRequest } from 'liqpay-nestjs'

const payload: CheckoutRequest = {
	action: 'pay',
	amount: 100,
	currency: 'UAH',
	description: 'Order #123',
	orderId: 'order-123',
}
```

`CheckoutRequest` also supports many LiqPay-specific fields for advanced scenarios, including:

- recurring payments: `subscribe`, `subscribeDateStart`, `subscribePeriodicity`
- one-click and tokenized flows: `cardToken`, `customer`, `customerUserId`, `recurringbytoken`
- fiscalization: `rroInfo`, `dae`
- split payments: `splitRules`
- customer and sender metadata: `ip`, `senderFirstName`, `senderLastName`, `senderAddress`, and related fields

## Schemas and Types

All public schemas and types are exported from the package root, so you can import them directly from `liqpay-nestjs`.

```ts
import {
	CheckoutCallback,
	CheckoutCallbackSchema,
	CheckoutRequest,
	CheckoutRequestSchema,
	PaymentStatusResponse,
	PaymentStatusResponseSchema,
	Result,
} from 'liqpay-nestjs'
```

Main export groups:

- base: `LiqPayEnvelope`, `LiqPayEnvelopeSchema`, `Result<T>`, request and response base unions
- checkout: `CheckoutRequest`, `CheckoutRequestSchema`, `CheckoutCallback`, `CheckoutCallbackSchema`
- payment status: `PaymentStatusRequest`, `PaymentStatusRequestSchema`, `PaymentStatusResponse`, `PaymentStatusResponseSchema`
- common: `DetailAddenda`, `FiscalData`, `SplitRule` and their schemas
- enums: action, currency, language, paytype, payment status, version, and related schema exports
- error: LiqPay error response and error code schemas and types
- nest: `LiqPayModule`, `LiqpayService`, `LiqPayOptions`, `LiqPayAsyncOptions`, `LIQPAY_OPTIONS`

### Validating your own DTOs with the exported schemas

```ts
import { CheckoutRequestSchema, LiqpayService } from 'liqpay-nestjs'

const payload = CheckoutRequestSchema.parse(input)
const checkout = liqpay.payments.create(payload)
```

This is useful if you want to validate incoming controller data before passing it to the service.

## Result Contract and Error Handling

Methods that parse LiqPay responses use this result shape:

```ts
type Result<T> =
	| { data: T; error?: null }
	| { data: null; error: { code: string; description: string } }
```

The library can return:

- LiqPay provider errors parsed from `err_code` and `err_description`
- internal parsing or transport errors such as `invalid_signature`, `decode_error`, `validation_error`, `invalid_response`, and `http_error`

Always check `result.error` before using `result.data`.

## Advanced Nest Exports

The package root also exports:

- `LIQPAY_OPTIONS`
- `createLiqpayOptionsProvider(...)`
- `createLiqpayAsyncOptionsProvider(...)`

These helpers are useful if you want to compose your own providers around the package token instead of using `LiqPayModule` directly.

## Build

```bash
npm run build
```
