# Bibliographic Reaction Object (BRO) v1.0 명세서

> **Schema ID**: `https://schema.slat.or.kr/bro/v1.0/schema.json`
> **JSON Schema Draft**: 2020-12
> **Specification Status**: Stable

---

## 1. 개요 (Overview)

**Bibliographic Reaction Object (BRO)** 는 서지(Bibliographic) 자원을 대상으로 하는 인간 또는 기계의 2차 저작 활동(Reaction) — 즉 서평, 독후감, 리뷰, 요약, 큐레이션 — 을 영속화하기 위해 설계된 JSON-LD 네이티브 데이터 스키마이다.

BRO는 [Schema.org](https://schema.org) 어휘(`ItemList`, `Article`, `CreativeWork`, `PropertyValue`, `Person`, `Organization` 등)를 1급 컨텍스트(`@context: "https://schema.org"`)로 채택하며, 표준 JSON Schema(Draft 2020-12) 기반의 검증 규약을 통해 실제 운영 환경에서의 직렬화/역직렬화, 영속 저장, 인덱싱, 상호 운용을 보장한다.

본 스키마는 다음 세 가지 최상위 엔티티 중 정확히 하나(`oneOf`)에 매칭되는 페이로드만을 유효한 BRO 인스턴스로 인정한다.

| Entity        | `@type`        | 역할                                        |
| ------------- | -------------- | ------------------------------------------- |
| `BroItemList` | `ItemList`     | 다중 문서를 포인터로 묶는 큐레이션 컨테이너 |
| `BroArticle`  | `Article`      | 코어 저작물(도서·논문 등)에 대한 파생 문서  |
| `BroAbstract` | `CreativeWork` | 특정 Article에 종속된 구조화 요약           |

---

## 2. 의의 및 목적 (Significance & Purpose)

### 2.1 해결하고자 하는 문제

기존의 서지 반응 데이터(블로그 서평, 마크다운 노트, 도서관 사용자 데이터 등)는 일반적으로 다음과 같은 비표준 형태로 분산 저장되어 있다.

- **YAML Frontmatter 캡슐화**: Markdown 문서 상단에 메타데이터를 은닉하여 본문과 결합 — 기계 인덱싱 시 본문/메타 분리 비용 발생.
- **메타데이터 평탄화 부재**: 작성자, 원작, 평점 등의 핵심 속성이 자유 텍스트에 매장되어 SQL/NoSQL 인덱서가 직접 접근 불가.
- **순환 참조 및 무한 내포**: 원본 저작물 객체가 다른 객체에 통째로 임베드되어 단편화·중복·갱신 무결성 파괴.
- **식별자 비표준화**: ISBN, DOI, UUID 등이 자유 형식으로 혼재.

### 2.2 BRO가 제공하는 보증

1. **메타-본문 분리 (Separation of Metadata and Content)**: 모든 메타 속성은 JSON 1급 프로퍼티 또는 `additionalProperty`로 분리되며, `text` 필드 내 YAML 프론트매터 은닉을 인입 단계에서 거부한다.
2. **포인터 기반 참조 (Reference-by-Identifier)**: `itemListElement`, `about`, `abstract`, `isBasedOn`은 객체 임베드를 금지하고 URN 식별자만을 보유한다. 이는 데이터 정규화, 부분 갱신, 단방향 참조 무결성을 가능케 한다.
3. **순환 참조 차단 (Cycle Prevention)**: `terminalIdentifier` 정의를 통해 참조 객체의 깊이를 1단계로 제한, Billion Laughs 류 무한 렌더링 공격을 원천 차단한다.
4. **낙관적 락 (Optimistic Locking)**: `version` 및 `dateModified` 필드를 통한 동시성 제어를 제공한다.
5. **다형 작성자 모델 (Polymorphic Creator)**: 개인·익명·정부·법인·비영리·소프트웨어 에이전트 6종을 `oneOf`로 다형화하여 데이터 손실 없는 작성자 추적을 제공한다.

### 2.3 적용 도메인

- 디지털 도서관의 사용자 생성 콘텐츠(UGC) 영속화
- AI 에이전트가 생성한 문서 반응(요약·평가·메타분석)의 추적 가능한 저장
- 학술 논문에 대한 리뷰 및 인용망 구축
- 독서 커뮤니티 플랫폼의 큐레이션 리스트 동기화

---

## 3. 핵심 설계 원칙 (Design Principles)

| 원칙                   | 구현 방식                                                                          |
| ---------------------- | ---------------------------------------------------------------------------------- |
| **JSON-LD 호환성**     | `@context`를 `https://schema.org` 상수로 강제                                      |
| **URN 식별자 정규화**  | 모든 내부 `@id`는 `urn:uuid:` 스킴, 외부 참조는 도메인별 URN 스킴(ISBN/DOI/UCI 등) |
| **시간 데이터 무결성** | RFC 3339 + Z 또는 오프셋 명시 강제                                                 |
| **확장성**             | `additionalProperty[].PropertyValue` 어휘를 통한 비파괴 확장                       |
| **계층 차단**          | 외부 식별 객체는 `terminalIdentifier` 1단계 깊이로 제한                            |

---

## 4. 엔티티 명세 (Entity Specification)

### 4.1 `BroItemList`

복수의 서지 반응 문서를 단일 컬렉션으로 묶는 영속 컨테이너이다.

#### 4.1.1 필수 속성

| 필드              | 타입            | 설명                                              |
| ----------------- | --------------- | ------------------------------------------------- |
| `@context`        | `const`         | `"https://schema.org"` 고정                       |
| `@type`           | `const`         | `"ItemList"` 고정                                 |
| `@id`             | URN UUID        | 컨테이너의 고유 식별자                            |
| `creator`         | `creatorRoot[]` | 컨테이너 작성자(1개 이상, 유니크)                 |
| `itemListElement` | `{@id}[]`       | 포함 문서의 URN UUID 포인터 배열. **임베드 금지** |
| `dateCreated`     | RFC 3339        | 생성 시각                                         |

#### 4.1.2 선택 속성

| 필드                 | 타입                  | 설명                  |
| -------------------- | --------------------- | --------------------- |
| `name`               | `string (2-2000)`     | 컨테이너 명칭         |
| `dateModified`       | RFC 3339              | 최종 수정 시각        |
| `version`            | `string` \| `number`  | 버전 해시 또는 시퀀스 |
| `inLanguage`         | BCP 47 / ISO 639 배열 | 언어 코드             |
| `keywords`           | `string[]`            | 분류 핵심어           |
| `additionalProperty` | `PropertyValue[]`     | 동적 메타데이터       |

> ⚠ **제약**: `itemListElement`의 각 원소는 `{ "@id": "urn:uuid:..." }` 형식의 포인터여야 하며, `Article` 또는 `Abstract` 본문을 직접 포함해서는 안 된다.

---

### 4.2 `BroArticle`

특정 코어 저작물(도서·논문 등)에 대한 단일 파생 문서(서평·리뷰·에세이)를 표현한다.

#### 4.2.1 필수 속성

| 필드          | 타입                   | 설명                                      |
| ------------- | ---------------------- | ----------------------------------------- |
| `@context`    | `const`                | `"https://schema.org"` 고정               |
| `@type`       | `const`                | `"Article"` 고정                          |
| `@id`         | URN UUID               | 문서의 고유 식별자                        |
| `about`       | `terminalIdentifier[]` | 타겟 코어 저작물 식별자(1개 이상, 유니크) |
| `text`        | `pureText`             | 본문 (Markdown 권장, 최대 300,000자)      |
| `creator`     | `creatorRoot[]`        | 작성자(1개 이상, 유니크)                  |
| `dateCreated` | RFC 3339               | 생성 시각                                 |

#### 4.2.2 선택 속성

| 필드                             | 타입                 | 설명                                                        |
| -------------------------------- | -------------------- | ----------------------------------------------------------- |
| `name`                           | `string`             | 파생 문서 자체의 제목                                       |
| `aboutName`                      | `string`             | 타겟 원작의 명칭 (역정규화 캐시)                            |
| `aboutCreator`                   | `string`             | 타겟 원작의 원작자 텍스트 표기 (역정규화)                   |
| `articleByline`                  | `string`             | 파생 문서 작성자의 크레딧 라인                              |
| `dateModified` / `datePublished` | RFC 3339             | 수정·발행 시각                                              |
| `version`                        | `string` \| `number` | 버전 식별자                                                 |
| `inLanguage`                     | 언어 배열            | BCP 47 코드                                                 |
| `keywords`                       | `string[]`           | 핵심어                                                      |
| `image`                          | URI 배열             | 관련 이미지 URL                                             |
| `citation`                       | URI 배열             | 인용 또는 원문 URL                                          |
| `abstract`                       | `{@id}[]`            | 종속 요약(`BroAbstract`)의 URN UUID 포인터. **임베드 금지** |
| `additionalProperty`             | `PropertyValue[]`    | 동적 메타데이터                                             |

> ℹ **역정규화 필드 사용 가이드**: `aboutName`, `aboutCreator`는 외부 URN 참조의 디그레이드(서비스 다운, 지연 로딩) 상황에서 사용자 인터페이스가 최소한의 컨텍스트를 표시할 수 있도록 의도된 캐시 필드이다. 정규 데이터 원천(Source of Truth)이 아니다.

> ⚠ **`text` 필드 제약**: YAML Frontmatter, INI 블록, 기타 메타데이터를 본문에 은닉하는 행위는 인입 거부 사유이다. 모든 메타 정보는 1급 프로퍼티 또는 `additionalProperty`로 분리되어야 한다.

---

### 4.3 `BroAbstract`

특정 `BroArticle` 또는 외부 코어 저작물에 대한 구조화된 요약이다.

#### 4.3.1 필수 속성

| 필드          | 타입                   | 설명                                              |
| ------------- | ---------------------- | ------------------------------------------------- |
| `@context`    | `const`                | `"https://schema.org"` 고정                       |
| `@type`       | `const`                | `"CreativeWork"` 고정                             |
| `@id`         | URN UUID               | 요약의 고유 식별자                                |
| `text`        | `pureText`             | 요약 본문                                         |
| `creator`     | `creatorRoot[]`        | 작성자                                            |
| `dateCreated` | RFC 3339               | 생성 시각                                         |
| `isBasedOn`   | `terminalIdentifier[]` | 원본 엔티티의 단방향 외부 식별자 포인터(1개 이상) |

#### 4.3.2 선택 속성

| 필드                 | 타입                 | 설명            |
| -------------------- | -------------------- | --------------- |
| `name`               | `string`             | 요약의 제목     |
| `dateModified`       | RFC 3339             | 최종 수정 시각  |
| `version`            | `string` \| `number` | 버전 식별자     |
| `inLanguage`         | 언어 배열            | BCP 47 코드     |
| `keywords`           | `string[]`           | 핵심어          |
| `image`              | URI 배열             | 관련 이미지     |
| `citation`           | URI 배열             | 인용 URL        |
| `additionalProperty` | `PropertyValue[]`    | 동적 메타데이터 |

---

## 5. 공통 타입 정의 (Shared Types)

### 5.1 식별자 (Identifiers)

#### 5.1.1 `urnUuidOnly`

내부 엔티티 `@id`에 강제되는 정규형 UUID URN.

```
urn:uuid:[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[457][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}
```

UUID 버전 4(랜덤), 5(네임스페이스 SHA-1), 7(Unix Epoch 정렬형)을 수용한다.

#### 5.1.2 `urnIdentifier` (외부 참조 전용)

외부 코어 저작물 참조에 사용되는 URN 스킴 집합. 모두 **소문자 정규화**가 전제된다.

| 스킴                 | 패턴                                               | 예시                                 |
| -------------------- | -------------------------------------------------- | ------------------------------------ |
| ISBN                 | `urn:isbn:(?:97[89]-?)?(?:\d[ -]?){9}[\dxX]`       | `urn:isbn:9788937462788`             |
| DOI                  | `urn:doi:10\.\d{4,9}\/[-._;()/:A-Za-z0-9]+`        | `urn:doi:10.1038/s41586-021-03819-2` |
| UCI                  | `urn:uci:[a-zA-Z0-9]{3,10}[:\-+][a-zA-Z0-9\-+.:]+` | `urn:uci:G704:001234567`             |
| KOLIS                | `urn:kolis:[a-zA-Z0-9]+`                           | `urn:kolis:CNTS00012345`             |
| NLK (국립중앙도서관) | `urn:nlk:[a-zA-Z0-9]+`                             | `urn:nlk:KMO201912345`               |
| UUID                 | (`urnUuidOnly`와 동일)                             | —                                    |

#### 5.1.3 `terminalIdentifier`

외부 참조 객체의 무한 내포를 차단하기 위한 단말 식별자 객체. `additionalProperties: false`가 강제된다.

```json
{
  "@type": "Article" | "CreativeWork",
  "identifier": "urn:isbn:..."
}
```

---

### 5.2 시각 (`strictDateTime`)

RFC 3339 기반의 엄격한 타임스탬프. **타임존 명시 누락(naive datetime)은 거부된다.**

```
^[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2}(?:\.[0-9]{1,6})?(?:Z|[+-][0-9]{2}:[0-9]{2})$
```

| 유효                               | 무효                  |
| ---------------------------------- | --------------------- |
| `2026-05-01T09:30:00Z`             | `2026-05-01 09:30:00` |
| `2026-05-01T09:30:00+09:00`        | `2026-05-01T09:30:00` |
| `2026-05-01T09:30:00.123456+09:00` | `2026-05-01T09:30Z`   |

---

### 5.3 작성자 (`creatorRoot`) 다형성

`oneOf`로 다음 6가지 하위 타입 중 하나로 한정된다.

| `@type`                  | 식별자 정책                                                    | 비고                                                                   |
| ------------------------ | -------------------------------------------------------------- | ---------------------------------------------------------------------- |
| `Person`                 | `@id` 선택. URN UUID 또는 `urn:orcid:NNNN-NNNN-NNNN-NNNX` 허용 | 외부 스크래핑 데이터의 파편화 수용                                     |
| `Anonymous`              | `@id` 없음                                                     | `null`/`undefined` 작성자에 대한 Fallback. `name` 기본값 `"Anonymous"` |
| `GovernmentOrganization` | `@id` 필수. URN UUID 또는 `urn:kr:govcode:NNNNNNN`             | 한국 정부조직 코드 7자리                                               |
| `Corporation`            | `@id` 필수. URN UUID 또는 `urn:kr:crn:NNNNNNNNNNNNN`           | 한국 법인등록번호 13자리                                               |
| `Organization`           | `@id` 필수. URN UUID 또는 `urn:kr:npo:NNNNNNNNNN`              | 한국 비영리단체 고유번호 10자리                                        |
| `SoftwareApplication`    | `@id` 필수. `urn:model:{vendor}:{version}`                     | AI/봇 에이전트, `softwareVersion` 권장                                 |

각 타입은 `additionalProperties: false`가 강제되므로 정의되지 않은 키를 추가할 수 없다.

---

### 5.4 동적 메타데이터 (`additionalProperty`)

스키마를 변경하지 않고 도메인별 커스텀 메타데이터를 수용하기 위한 컨테이너이다. Schema.org `PropertyValue` 어휘를 채택한다.

```json
{
  "@type": "PropertyValue",
  "name": "rating",
  "value": 4.5
}
```

`value`는 원시 타입(문자열·숫자·불리언) 및 객체를 모두 허용하며, NoSQL 또는 RDBMS의 JSON 컬럼에서 `name` 키 기반 인덱싱이 가능하다.

---

### 5.5 본문 필드 (`pureText`)

- 타입: `string`
- 길이: 0 ~ 300,000자
- 권장 포맷: CommonMark 준수 Markdown
- **금지**: YAML/INI/TOML 프론트매터 또는 본문 내 메타데이터 은닉

---

## 6. 사용 예시 (Usage Examples)

### 6.1 단일 서평 (BroArticle) — 도서 대상

도서 『1984』(ISBN 9780451524935)에 대한 개인 서평.

```json
{
  "@context": "https://schema.org",
  "@type": "Article",
  "@id": "urn:uuid:7c9e6679-7425-40de-944b-e07fc1f90ae7",
  "name": "전체주의의 언어, 그리고 침묵의 무게",
  "aboutName": "1984",
  "aboutCreator": "George Orwell",
  "articleByline": "by 김독자",
  "dateCreated": "2026-04-15T18:22:00+09:00",
  "datePublished": "2026-04-16T09:00:00+09:00",
  "version": 1,
  "about": [
    {
      "@type": "CreativeWork",
      "identifier": "urn:isbn:9780451524935"
    }
  ],
  "text": "# 전체주의의 언어\n\n오웰이 그린 디스토피아는 ...",
  "inLanguage": ["ko"],
  "keywords": ["디스토피아", "전체주의", "언어철학"],
  "image": ["https://cdn.example.org/covers/1984.jpg"],
  "citation": ["https://en.wikipedia.org/wiki/Newspeak"],
  "creator": [
    {
      "@type": "Person",
      "name": "김독자",
      "@id": "urn:orcid:0000-0002-1825-0097"
    }
  ],
  "abstract": [{ "@id": "urn:uuid:f47ac10b-58cc-4372-a567-0e02b2c3d479" }],
  "additionalProperty": [
    { "@type": "PropertyValue", "name": "rating", "value": 4.5 },
    { "@type": "PropertyValue", "name": "readingStatus", "value": "completed" }
  ]
}
```

### 6.2 종속 요약 (BroAbstract)

위 Article의 종속 요약.

```json
{
  "@context": "https://schema.org",
  "@type": "CreativeWork",
  "@id": "urn:uuid:f47ac10b-58cc-4372-a567-0e02b2c3d479",
  "name": "1984 서평 핵심 요약",
  "dateCreated": "2026-04-16T10:00:00+09:00",
  "version": 1,
  "text": "오웰이 제안하는 신어(Newspeak)의 본질은 ...",
  "inLanguage": ["ko"],
  "keywords": ["요약", "핵심"],
  "creator": [
    {
      "@type": "SoftwareApplication",
      "name": "BRO Summarizer",
      "softwareVersion": "1.2.0",
      "@id": "urn:model:slat-summarizer:1.2.0"
    }
  ],
  "isBasedOn": [
    {
      "@type": "Article",
      "identifier": "urn:uuid:7c9e6679-7425-40de-944b-e07fc1f90ae7"
    }
  ]
}
```

### 6.3 큐레이션 컨테이너 (BroItemList)

복수의 서평을 묶은 큐레이션 리스트.

```json
{
  "@context": "https://schema.org",
  "@type": "ItemList",
  "@id": "urn:uuid:b1d4f2e8-3a7c-4b6e-9d1f-2c8a5e3f0b9d",
  "name": "2026년 1분기 디스토피아 컬렉션",
  "dateCreated": "2026-04-20T12:00:00+09:00",
  "dateModified": "2026-04-30T18:00:00+09:00",
  "version": "v3",
  "creator": [
    {
      "@type": "Person",
      "name": "큐레이터 이도서",
      "@id": "urn:uuid:5a8f3b2c-1d9e-4f7a-8c6b-2e1d4a9c7f3b"
    }
  ],
  "itemListElement": [
    { "@id": "urn:uuid:7c9e6679-7425-40de-944b-e07fc1f90ae7" },
    { "@id": "urn:uuid:9b2c5d4e-8f7a-4b3c-a1d2-3e4f5a6b7c8d" },
    { "@id": "urn:uuid:1a2b3c4d-5e6f-4789-9abc-def012345678" }
  ],
  "inLanguage": ["ko"],
  "keywords": ["디스토피아", "큐레이션", "2026Q1"],
  "additionalProperty": [
    { "@type": "PropertyValue", "name": "visibility", "value": "public" }
  ]
}
```

---

## 7. 검증 및 통합 (Validation & Integration)

### 7.1 JSON Schema 검증

표준 JSON Schema Draft 2020-12 호환 검증기를 사용한다. Python 예시:

```python
import json
import urllib.request
from jsonschema import Draft202012Validator

schema_url = "https://schema.slat.or.kr/bro/v1.0/schema.json"
schema = json.loads(urllib.request.urlopen(schema_url).read())

validator = Draft202012Validator(schema)
with open("payload.json", encoding="utf-8") as f:
    payload = json.load(f)

errors = sorted(validator.iter_errors(payload), key=lambda e: e.path)
if errors:
    for e in errors:
        print(f"[INVALID] {list(e.path)}: {e.message}")
    raise SystemExit(1)
print("[OK] BRO payload conforms to v1.0")
```

Node.js (Ajv) 예시:

```javascript
import Ajv2020 from "ajv/dist/2020.js";
import addFormats from "ajv-formats";
import schema from "./bro.v1.0.schema.json" assert { type: "json" };

const ajv = new Ajv2020({ allErrors: true, strict: false });
addFormats(ajv);
const validate = ajv.compile(schema);

const valid = validate(payload);
if (!valid) {
  console.error(validate.errors);
  process.exit(1);
}
```

### 7.2 영속화 권고 (Persistence Recommendations)

| 환경                   | 권고 사항                                                                                  |
| ---------------------- | ------------------------------------------------------------------------------------------ |
| **RDBMS (PostgreSQL)** | `@id`를 PK, JSONB 컬럼에 페이로드 저장. `additionalProperty`는 GIN 인덱스 적용             |
| **NoSQL (MongoDB)**    | `@id`를 `_id`로 매핑(URN 문자열 그대로). `keywords`, `additionalProperty.name`에 인덱스    |
| **Graph DB**           | `BroArticle.about`, `BroAbstract.isBasedOn`, `BroItemList.itemListElement`를 엣지로 모델링 |
| **검색 엔진**          | `name`, `aboutName`, `aboutCreator`, `keywords`, `text`를 풀텍스트 인덱싱                  |

### 7.3 동시성 제어

`dateModified`와 `version`을 활용한 낙관적 락(Optimistic Locking)을 권고한다. 서버는 PUT/PATCH 요청 시 클라이언트가 보낸 `version`이 저장된 값과 일치하는지 확인 후 갱신한다. 불일치 시 `409 Conflict`를 반환한다.

### 7.4 참조 무결성

본 스키마는 `itemListElement`, `abstract`의 포인터가 실제 존재하는지 검증하지 않는다. 참조 무결성은 애플리케이션 계층 또는 데이터베이스 트리거에서 강제해야 한다. 권고:

1. **단방향 참조**: `BroAbstract.isBasedOn`이 가리키는 외부 식별자는 외부 시스템 또는 다른 BRO 인스턴스의 `@id`이며, BRO는 역참조를 자동 갱신하지 않는다.
2. **삭제 정책**: `BroArticle` 삭제 시 종속 `BroAbstract`의 처리 정책(소프트 삭제·고아 허용·캐스케이드)은 애플리케이션이 결정한다.

---

## 8. 보안 고려사항 (Security Considerations)

| 항목                           | 대응                                             |
| ------------------------------ | ------------------------------------------------ |
| **JSON Bomb / Billion Laughs** | `terminalIdentifier`로 외부 참조 깊이 1단계 제한 |
| **메타데이터 인젝션**          | `text` 필드 내 YAML 프론트매터 패턴 인입 거부    |
| **타임존 위장**                | naive datetime 거부                              |
| **식별자 위장**                | URN 스킴별 정규식 강제, 혼재 입력 거부           |
| **본문 비대화 공격**           | `pureText` 최대 300,000자 제한                   |

---

## 9. 버전 정책 (Versioning Policy)

본 스키마는 [Semantic Versioning 2.0.0](https://semver.org)을 따른다.

- **MAJOR**: 후방 비호환 변경 (필수 필드 추가, 기존 필드 의미 변경 등)
- **MINOR**: 후방 호환 확장 (선택 필드 추가, 새 enum 값 등)
- **PATCH**: 문서·정규식 미세 보정

스키마 인스턴스는 `$id` URL을 통해 자신이 준수하는 버전을 명시적으로 식별한다.

---

## 10. 라이선스 및 문의

- 사양 문서 라이선스: [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/)
- 스키마 파일 라이선스: 별도 명시
- 발행 주체: SLAT (`schema.slat.or.kr`)
- 이슈 및 피드백: 발행 주체의 공식 리포지토리를 통해 접수

---

## 부록 A. 정규식 요약 (Regex Cheat Sheet)

```
UUID URN     : ^urn:uuid:[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[457][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$
ISBN URN     : ^urn:isbn:(?:97[89]-?)?(?:\d[ -]?){9}[\dxX]$
DOI URN      : ^urn:doi:10\.\d{4,9}\/[-._;()/:A-Za-z0-9]+$
UCI URN      : ^urn:uci:[a-zA-Z0-9]{3,10}[:\-+][a-zA-Z0-9\-+.:]+$
KOLIS URN    : ^urn:kolis:[a-zA-Z0-9]+$
NLK URN      : ^urn:nlk:[a-zA-Z0-9]+$
ORCID URN    : ^urn:orcid:\d{4}-\d{4}-\d{4}-\d{3}[0-9X]$
GovCode URN  : ^urn:kr:govcode:\d{7}$
CRN URN      : ^urn:kr:crn:\d{13}$
NPO URN      : ^urn:kr:npo:\d{10}$
Model URN    : ^urn:model:[a-zA-Z0-9-]+:[a-zA-Z0-9\.-]+$
DateTime     : ^[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2}(?:\.[0-9]{1,6})?(?:Z|[+-][0-9]{2}:[0-9]{2})$
Language     : ^[a-zA-Z]{2,3}(-[a-zA-Z0-9]+)?$
```

## 부록 B. 엔티티 관계도

```
┌─────────────────┐
│  BroItemList    │ ────itemListElement[*]────┐
│  (ItemList)     │                            │
└─────────────────┘                            ▼
                                     ┌─────────────────┐
                                     │   BroArticle    │
                ┌────about[1..*]──── │   (Article)     │
                ▼                    └─────────────────┘
   ┌─────────────────────────┐                │
   │  External CreativeWork  │                │ abstract[*]
   │  (urn:isbn / urn:doi)   │                ▼
   └─────────────────────────┘      ┌─────────────────┐
                                     │   BroAbstract   │
                                     │ (CreativeWork)  │
                                     └─────────────────┘
                                              │
                                              │ isBasedOn[1..*]
                                              ▼
                                     (Article 또는 외부 CreativeWork)
```
