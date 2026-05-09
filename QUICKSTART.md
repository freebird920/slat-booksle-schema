# BRO v1.0 Quickstart

BRO v1.0 is Reaction-first. A list does not directly contain books in canonical exchange form. A simple list entry is represented as a `Reaction` with `reactionType: "Listing"`, and `ReactionList.itemListElement` references those Reaction nodes.

## Validate a Payload

```ts
import { validateBroSchema } from "@slat.or.kr/bro-schema";

const result = validateBroSchema(payload);
if (!result.valid) {
  console.error(result.errors);
}
```

## Listing Reaction

```json
{
  "@context": "https://schema.slat.or.kr/bro/v1.0/context.jsonld",
  "@type": "Reaction",
  "@id": "urn:uuid:018f1b2c-0000-7000-8000-000000000101",
  "reactionType": "Listing",
  "about": [{ "@type": "Book", "name": "아몬드", "creatorName": "손원평" }],
  "text": "",
  "creator": [{ "@type": "Library", "name": "예시공공도서관" }],
  "dateCreated": "2026-05-09T00:00:00+09:00"
}
```

`Listing.text` may be empty or contain a recommendation/selection rationale.

## Response Reaction

```json
{
  "@context": "https://schema.slat.or.kr/bro/v1.0/context.jsonld",
  "@type": "Reaction",
  "@id": "urn:uuid:018f1b2c-0000-7000-8000-000000000103",
  "reactionType": "Response",
  "about": [{ "@type": "Book", "identifier": "urn:isbn:9788937462788", "name": "1984" }],
  "text": "언어와 권력의 관계를 토론하기에 적합하다.",
  "creator": [{ "@type": "Person", "name": "김교사" }],
  "dateCreated": "2026-05-09T09:00:00+09:00"
}
```

`Response.text` must contain non-whitespace text.

## ReactionList

```json
{
  "@context": "https://schema.slat.or.kr/bro/v1.0/context.jsonld",
  "@type": "ReactionList",
  "@id": "urn:uuid:018f1b2c-0000-7000-8000-000000000100",
  "name": "2026년 5월 사서 추천 자료",
  "itemListElement": [
    {
      "@id": "urn:uuid:018f1b2c-0000-7000-8000-000000000101",
      "@type": "Reaction"
    }
  ],
  "creator": [{ "@type": "Library", "name": "예시공공도서관" }],
  "dateCreated": "2026-05-09T00:00:00+09:00"
}
```

## Graph Exchange

Use top-level `@graph` when a list and its Reaction items need to travel together.

```json
{
  "@context": "https://schema.slat.or.kr/bro/v1.0/context.jsonld",
  "@graph": [
    {
      "@type": "ReactionList",
      "@id": "urn:uuid:018f1b2c-0000-7000-8000-000000000100",
      "itemListElement": [
        {
          "@id": "urn:uuid:018f1b2c-0000-7000-8000-000000000101",
          "@type": "Reaction"
        }
      ],
      "creator": [{ "@type": "Library", "name": "예시공공도서관" }],
      "dateCreated": "2026-05-09T00:00:00+09:00"
    },
    {
      "@type": "Reaction",
      "@id": "urn:uuid:018f1b2c-0000-7000-8000-000000000101",
      "reactionType": "Listing",
      "about": [{ "@type": "Book", "name": "아몬드", "creatorName": "손원평" }],
      "text": "",
      "creator": [{ "@type": "Library", "name": "예시공공도서관" }],
      "dateCreated": "2026-05-09T00:00:00+09:00"
    }
  ]
}
```

## Authoring Rules

- Use `Listing` for list inclusion, recommendations, selections, awards, and shortlist membership.
- Use `Response` for independent review, comment, critique, assessment, or reader response text.
- Use `Unspecified` when the source does not safely reveal the main function.
- Use `source` and `sourceKey` for provenance and idempotent re-ingestion when available.
- Do not use `verified: true`; preserve evidence through `creator`, `byline`, `source`, `credential`, and identifiers.
