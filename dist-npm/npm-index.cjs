"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/npm-index.ts
var npm_index_exports = {};
__export(npm_index_exports, {
  AGENT_TYPES: () => AGENT_TYPES,
  BRO_CONTEXT_IRI: () => BRO_CONTEXT_IRI,
  BRO_ENTITY_TYPES: () => BRO_ENTITY_TYPES,
  BRO_SCHEMA_IRI: () => BRO_SCHEMA_IRI,
  BRO_VOCAB_IRI: () => BRO_VOCAB_IRI,
  BroV1Context: () => broV1Context,
  BroV1Schema: () => bro_v1_schema_default,
  BroV1VocabTurtle: () => broV1VocabTurtle,
  CREATOR_TYPES: () => AGENT_TYPES,
  REACTION_TYPES: () => REACTION_TYPES,
  assertBroSchema: () => assertBroSchema,
  broV1Schema: () => bro_v1_schema_default,
  cloneAndNormalizePayload: () => cloneAndNormalizePayload,
  convertBroToBibframe: () => convertBroToBibframe,
  convertBroToKomarc: () => convertBroToKomarc,
  isBroGraph: () => isBroGraph,
  isBroNode: () => isBroNode,
  isBroPayload: () => isBroPayload,
  isReaction: () => isReaction,
  isReactionAbstract: () => isReactionAbstract,
  isReactionList: () => isReactionList,
  normalizePayload: () => normalizePayload,
  normalizeUrnScheme: () => normalizeUrnScheme,
  renderBroToMarkdown: () => renderBroToMarkdown,
  validateBroSchema: () => validateBroSchema
});
module.exports = __toCommonJS(npm_index_exports);

// worker/assets/bro-v1-schema.json
var bro_v1_schema_default = {
  $schema: "https://json-schema.org/draft/2020-12/schema",
  $id: "https://schema.slat.or.kr/bro/v1.0/schema.json",
  title: "Bibliographic Reaction Object (BRO) v1.0",
  description: "BRO v1.0 exchange schema for bibliographic reaction data. Canonical BRO treats listing, recommendation, selection, award inclusion, review, comment, and unspecified response as Reaction signals. ReactionList groups Reaction or optional ReactionAbstract references. ReactionAbstract is an optional derived summary artifact, not a primary observed reaction. BRO is a lightweight JSON-LD application profile intended to connect fragmented human/institutional bibliographic reaction signals with existing bibliographic standards and commercial metadata systems; it does not replace MARC, MODS, BIBFRAME, ONIX, DataCite, Schema.org, Web Annotation, RLI, or national bibliographic datasets.",
  type: "object",
  oneOf: [
    {
      $ref: "#/$defs/Reaction"
    },
    {
      $ref: "#/$defs/ReactionAbstract"
    },
    {
      $ref: "#/$defs/ReactionList"
    },
    {
      $ref: "#/$defs/BROGraph"
    }
  ],
  $defs: {
    contextRef: {
      description: "MUST be the BRO v1.0 context IRI. If extension contexts are used, the BRO context MUST be first so that BRO terms are fixed before extension terms are introduced.",
      oneOf: [
        {
          const: "https://schema.slat.or.kr/bro/v1.0/context.jsonld"
        },
        {
          type: "array",
          minItems: 1,
          prefixItems: [
            {
              const: "https://schema.slat.or.kr/bro/v1.0/context.jsonld"
            }
          ],
          items: {
            oneOf: [
              {
                type: "string",
                format: "uri"
              },
              {
                type: "object"
              }
            ]
          }
        }
      ]
    },
    uuidUrn: {
      type: "string",
      pattern: "^urn:uuid:[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$"
    },
    httpsIri: {
      type: "string",
      pattern: '^https://(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?\\.)+[a-zA-Z]{2,}(?::[0-9]{1,5})?(?:/[^\\s<>"\\\\^`{|}]*)?$',
      maxLength: 2048
    },
    httpOrHttpsIri: {
      type: "string",
      pattern: '^https?://[^\\s<>"\\\\^`{|}]+$',
      maxLength: 2048
    },
    mailtoUri: {
      type: "string",
      pattern: "^mailto:[^\\s@]+@[^\\s@]+\\.[^\\s@]+$",
      maxLength: 320
    },
    orcidHttpsIri: {
      type: "string",
      pattern: "^https://orcid\\.org/[0-9]{4}-[0-9]{4}-[0-9]{4}-[0-9]{3}[0-9X]$"
    },
    entityIri: {
      description: "Identifier for a BRO entity instance. UUID URN or HTTPS IRI.",
      anyOf: [
        {
          $ref: "#/$defs/uuidUrn"
        },
        {
          $ref: "#/$defs/httpsIri"
        }
      ]
    },
    agentIri: {
      description: "Identifier for an agent. UUID URN, HTTPS IRI, ORCID HTTPS IRI, or mailto URI.",
      anyOf: [
        {
          $ref: "#/$defs/uuidUrn"
        },
        {
          $ref: "#/$defs/httpsIri"
        },
        {
          $ref: "#/$defs/orcidHttpsIri"
        },
        {
          $ref: "#/$defs/mailtoUri"
        }
      ]
    },
    rfc3339DateTime: {
      type: "string",
      format: "date-time",
      pattern: "^[0-9]{4}-(?:0[1-9]|1[0-2])-(?:0[1-9]|[12][0-9]|3[01])T(?:[01][0-9]|2[0-3]):[0-5][0-9]:(?:[0-5][0-9]|60)(?:\\.[0-9]+)?(?:Z|[+-](?:[01][0-9]|2[0-3]):[0-5][0-9])$"
    },
    rfc3339Date: {
      type: "string",
      pattern: "^[0-9]{4}-(?:0[1-9]|1[0-2])-(?:0[1-9]|[12][0-9]|3[01])$"
    },
    bibliographicDate: {
      description: "Bibliographic date from source metadata. Allows year, year-month, full date, or RFC3339 date-time because publication dates are often partial.",
      type: "string",
      pattern: "^(?:[0-9]{4}|[0-9]{4}-(?:0[1-9]|1[0-2])|[0-9]{4}-(?:0[1-9]|1[0-2])-(?:0[1-9]|[12][0-9]|3[01])|[0-9]{4}-(?:0[1-9]|1[0-2])-(?:0[1-9]|[12][0-9]|3[01])T(?:[01][0-9]|2[0-3]):[0-5][0-9]:(?:[0-5][0-9]|60)(?:\\.[0-9]+)?(?:Z|[+-](?:[01][0-9]|2[0-3]):[0-5][0-9]))$"
    },
    languageTag: {
      type: "string",
      pattern: "^[a-zA-Z]{2,3}(?:-[a-zA-Z0-9]{1,8})*$",
      maxLength: 35
    },
    languageTagArray: {
      type: "array",
      minItems: 1,
      maxItems: 20,
      items: {
        $ref: "#/$defs/languageTag"
      },
      uniqueItems: true
    },
    plainText: {
      type: "string",
      minLength: 1,
      maxLength: 2e3
    },
    longText: {
      type: "string",
      minLength: 1,
      maxLength: 1e4
    },
    bylineString: {
      type: "string",
      minLength: 1,
      maxLength: 2e3,
      description: "Free-form attribution string as it appears in the source. Structured agent metadata belongs in creator."
    },
    sourceKey: {
      type: "string",
      minLength: 1,
      maxLength: 1e3,
      description: "Source-local key used for idempotent re-ingestion. It is not a global bibliographic identifier."
    },
    keywordsArray: {
      type: "array",
      minItems: 0,
      maxItems: 100,
      items: {
        type: "string",
        minLength: 1,
        maxLength: 200
      },
      uniqueItems: true
    },
    genreArray: {
      type: "array",
      minItems: 1,
      maxItems: 50,
      items: {
        type: "string",
        minLength: 1,
        maxLength: 200
      },
      uniqueItems: true
    },
    stringArray: {
      type: "array",
      minItems: 1,
      maxItems: 100,
      items: {
        type: "string",
        minLength: 1,
        maxLength: 2e3
      },
      uniqueItems: true
    },
    uriArray: {
      type: "array",
      minItems: 0,
      maxItems: 200,
      items: {
        type: "string",
        format: "uri",
        maxLength: 2048
      },
      uniqueItems: true
    },
    bodyText: {
      type: "string",
      description: "Main text body. MUST NOT begin with YAML/TOML front matter. Response reactions require at least one non-whitespace character; Listing and Unspecified may be empty.",
      minLength: 0,
      maxLength: 3e5,
      not: {
        pattern: "^(?:---|\\+\\+\\+)\\s*(?:\\r?\\n|$)"
      }
    },
    textFormat: {
      type: "string",
      description: "MIME type hint. Absent means text/plain.",
      pattern: '^[a-zA-Z0-9][a-zA-Z0-9!#$&^_.+-]{0,126}/[a-zA-Z0-9][a-zA-Z0-9!#$&^_.+-]{0,126}(?:\\s*;\\s*[a-zA-Z0-9!#$&^_.+-]+=(?:[a-zA-Z0-9!#$&^_.+-]+|"[^"]*"))*$',
      maxLength: 255
    },
    reactionType: {
      type: "string",
      enum: [
        "Response",
        "Listing",
        "Unspecified"
      ],
      default: "Unspecified",
      description: "Discriminator for the Reaction's primary information function, not for the prose style or length of text."
    },
    workType: {
      type: "string",
      pattern: "^[A-Z][A-Za-z0-9]*$",
      maxLength: 100,
      not: {
        enum: [
          "Reaction",
          "ReactionAbstract",
          "ReactionList"
        ]
      },
      description: "A Schema.org CreativeWork-compatible type token such as Book, Article, ScholarlyArticle, WebPage, Dataset, Report, Chapter, CreativeWork. BRO entity types are excluded here; use entityReference for Reaction/ReactionAbstract/ReactionList."
    },
    identifierString: {
      type: "string",
      minLength: 1,
      maxLength: 2048,
      description: "Identifier token for matching and linking. May be ISBN URN, DOI HTTPS IRI, LOD URI, control number, commercial dataset id, or other source identifier. Do not mix identifiers for different editions/manifestations in one object."
    },
    boundedJsonValue: {
      oneOf: [
        {
          type: "string",
          maxLength: 1e4
        },
        {
          type: "number"
        },
        {
          type: "boolean"
        },
        {
          type: "null"
        },
        {
          type: "array",
          maxItems: 100,
          items: {
            oneOf: [
              {
                type: "string",
                maxLength: 1e4
              },
              {
                type: "number"
              },
              {
                type: "boolean"
              },
              {
                type: "null"
              },
              {
                type: "object",
                maxProperties: 50
              }
            ]
          }
        },
        {
          type: "object",
          maxProperties: 50
        }
      ]
    },
    propertyValue: {
      type: "object",
      required: [
        "@type",
        "name",
        "value"
      ],
      properties: {
        "@type": {
          const: "PropertyValue"
        },
        name: {
          type: "string",
          minLength: 1,
          maxLength: 200
        },
        propertyID: {
          type: "string",
          minLength: 1,
          maxLength: 2048
        },
        value: {
          $ref: "#/$defs/boundedJsonValue"
        },
        valueReference: {
          type: "string",
          format: "uri",
          maxLength: 2048
        },
        unitCode: {
          type: "string",
          maxLength: 50
        },
        unitText: {
          type: "string",
          maxLength: 50
        }
      },
      additionalProperties: false
    },
    identifierValue: {
      description: "One or more identifiers for the same bibliographic resource or external record.",
      oneOf: [
        {
          $ref: "#/$defs/identifierString"
        },
        {
          $ref: "#/$defs/propertyValue"
        },
        {
          type: "array",
          minItems: 1,
          maxItems: 50,
          uniqueItems: true,
          items: {
            oneOf: [
              {
                $ref: "#/$defs/identifierString"
              },
              {
                $ref: "#/$defs/propertyValue"
              }
            ]
          }
        }
      ]
    },
    additionalPropertyArray: {
      type: "array",
      maxItems: 200,
      items: {
        $ref: "#/$defs/propertyValue"
      }
    },
    extensionValue: {
      description: "Value of colon-prefixed extension properties. Keep extension values bounded.",
      oneOf: [
        {
          type: "string",
          maxLength: 1e4
        },
        {
          type: "number"
        },
        {
          type: "boolean"
        },
        {
          type: "null"
        },
        {
          type: "object",
          maxProperties: 20,
          properties: {
            "@id": {
              type: "string",
              format: "uri"
            },
            "@type": {
              type: "string",
              maxLength: 200
            },
            "@value": {
              type: [
                "string",
                "number",
                "boolean"
              ]
            },
            "@language": {
              $ref: "#/$defs/languageTag"
            }
          },
          patternProperties: {
            "^[a-z][a-z0-9-]*:[A-Za-z][A-Za-z0-9_-]*$": {
              oneOf: [
                {
                  type: "string",
                  maxLength: 1e4
                },
                {
                  type: "number"
                },
                {
                  type: "boolean"
                },
                {
                  type: "null"
                },
                {
                  type: "object",
                  maxProperties: 20
                },
                {
                  type: "array",
                  maxItems: 100
                }
              ]
            }
          },
          additionalProperties: false
        },
        {
          type: "array",
          maxItems: 100,
          items: {
            oneOf: [
              {
                type: "string",
                maxLength: 1e4
              },
              {
                type: "number"
              },
              {
                type: "boolean"
              },
              {
                type: "object",
                maxProperties: 20
              }
            ]
          }
        }
      ]
    },
    extensionPattern: {
      "^[a-z][a-z0-9-]*:[A-Za-z][A-Za-z0-9_-]*$": {
        $ref: "#/$defs/extensionValue"
      }
    },
    workReference: {
      type: "object",
      description: "Terminal pointer or partial description of a bibliographic or cultural resource. It is intentionally lighter than a full bibliographic record.",
      required: [
        "@type"
      ],
      anyOf: [
        {
          required: [
            "@id"
          ]
        },
        {
          required: [
            "identifier"
          ]
        },
        {
          required: [
            "name"
          ]
        }
      ],
      properties: {
        "@type": {
          $ref: "#/$defs/workType"
        },
        "@id": {
          type: "string",
          format: "uri",
          maxLength: 2048
        },
        identifier: {
          $ref: "#/$defs/identifierValue"
        },
        name: {
          $ref: "#/$defs/plainText"
        },
        creatorName: {
          type: "string",
          minLength: 1,
          maxLength: 2e3,
          description: "Human-readable creator/author display string for unresolved or lightweight bibliographic references."
        },
        publisherName: {
          type: "string",
          minLength: 1,
          maxLength: 2e3
        },
        bookEdition: {
          type: "string",
          minLength: 1,
          maxLength: 1e3
        },
        datePublished: {
          $ref: "#/$defs/bibliographicDate"
        },
        url: {
          type: "string",
          format: "uri",
          maxLength: 2048
        },
        inLanguage: {
          $ref: "#/$defs/languageTagArray"
        },
        keywords: {
          $ref: "#/$defs/keywordsArray"
        },
        additionalProperty: {
          $ref: "#/$defs/additionalPropertyArray"
        }
      },
      patternProperties: {
        "^[a-z][a-z0-9-]*:[A-Za-z][A-Za-z0-9_-]*$": {
          $ref: "#/$defs/extensionValue"
        }
      },
      additionalProperties: false
    },
    workReferenceArray: {
      type: "array",
      minItems: 1,
      maxItems: 20,
      items: {
        $ref: "#/$defs/workReference"
      },
      uniqueItems: true
    },
    reactionOrAbstractReference: {
      type: "object",
      required: [
        "@id",
        "@type"
      ],
      properties: {
        "@id": {
          $ref: "#/$defs/entityIri"
        },
        "@type": {
          type: "string",
          enum: [
            "Reaction",
            "ReactionAbstract"
          ]
        }
      },
      additionalProperties: false
    },
    reactionListReference: {
      type: "object",
      required: [
        "@id",
        "@type"
      ],
      properties: {
        "@id": {
          $ref: "#/$defs/entityIri"
        },
        "@type": {
          const: "ReactionList"
        }
      },
      additionalProperties: false
    },
    entityReference: {
      type: "object",
      required: [
        "@id",
        "@type"
      ],
      properties: {
        "@id": {
          $ref: "#/$defs/entityIri"
        },
        "@type": {
          type: "string",
          enum: [
            "Reaction",
            "ReactionAbstract",
            "ReactionList"
          ]
        }
      },
      additionalProperties: false
    },
    basisReference: {
      oneOf: [
        {
          $ref: "#/$defs/workReference"
        },
        {
          $ref: "#/$defs/entityReference"
        }
      ]
    },
    agentPerson: {
      type: "object",
      required: [
        "@type",
        "name"
      ],
      properties: {
        "@type": {
          const: "Person"
        },
        "@id": {
          $ref: "#/$defs/agentIri"
        },
        name: {
          type: "string",
          minLength: 1,
          maxLength: 1e3
        },
        jobTitle: {
          type: "string",
          minLength: 1,
          maxLength: 1e3
        },
        affiliation: {
          type: "array",
          minItems: 1,
          maxItems: 20,
          items: {
            $ref: "#/$defs/agentOrganization"
          },
          uniqueItems: true
        },
        knowsAbout: {
          type: "array",
          minItems: 1,
          maxItems: 100,
          items: {
            type: "string",
            minLength: 1,
            maxLength: 500
          },
          uniqueItems: true
        },
        credential: {
          type: "array",
          minItems: 1,
          maxItems: 50,
          items: {
            type: "string",
            minLength: 1,
            maxLength: 1e3
          },
          uniqueItems: true
        },
        additionalProperty: {
          $ref: "#/$defs/additionalPropertyArray"
        }
      },
      additionalProperties: false
    },
    agentUnknown: {
      type: "object",
      required: [
        "@type"
      ],
      properties: {
        "@type": {
          const: "UnknownAgent"
        },
        name: {
          type: "string",
          minLength: 1,
          maxLength: 1e3
        },
        additionalProperty: {
          $ref: "#/$defs/additionalPropertyArray"
        }
      },
      additionalProperties: false
    },
    agentOrganization: {
      type: "object",
      required: [
        "@type",
        "name"
      ],
      properties: {
        "@type": {
          type: "string",
          enum: [
            "Organization",
            "Library",
            "GovernmentOrganization",
            "EducationalOrganization",
            "School",
            "Corporation"
          ]
        },
        "@id": {
          anyOf: [
            {
              $ref: "#/$defs/uuidUrn"
            },
            {
              $ref: "#/$defs/httpsIri"
            }
          ]
        },
        name: {
          type: "string",
          minLength: 1,
          maxLength: 1e3
        },
        knowsAbout: {
          type: "array",
          minItems: 1,
          maxItems: 100,
          items: {
            type: "string",
            minLength: 1,
            maxLength: 500
          },
          uniqueItems: true
        },
        credential: {
          type: "array",
          minItems: 1,
          maxItems: 50,
          items: {
            type: "string",
            minLength: 1,
            maxLength: 1e3
          },
          uniqueItems: true
        },
        additionalProperty: {
          $ref: "#/$defs/additionalPropertyArray"
        }
      },
      additionalProperties: false
    },
    agentSoftware: {
      type: "object",
      required: [
        "@type",
        "@id",
        "name"
      ],
      properties: {
        "@type": {
          const: "SoftwareApplication"
        },
        "@id": {
          $ref: "#/$defs/httpsIri"
        },
        name: {
          type: "string",
          minLength: 1,
          maxLength: 1e3
        },
        softwareVersion: {
          type: "string",
          minLength: 1,
          maxLength: 100
        },
        additionalProperty: {
          $ref: "#/$defs/additionalPropertyArray"
        }
      },
      additionalProperties: false
    },
    agentInRole: {
      oneOf: [
        {
          $ref: "#/$defs/agentPerson"
        },
        {
          $ref: "#/$defs/agentUnknown"
        },
        {
          $ref: "#/$defs/agentOrganization"
        },
        {
          $ref: "#/$defs/agentSoftware"
        }
      ]
    },
    agentRole: {
      type: "object",
      required: [
        "@type",
        "agent"
      ],
      properties: {
        "@type": {
          const: "Role"
        },
        roleName: {
          type: "string",
          minLength: 1,
          maxLength: 1e3
        },
        startDate: {
          $ref: "#/$defs/rfc3339Date"
        },
        endDate: {
          $ref: "#/$defs/rfc3339Date"
        },
        agent: {
          $ref: "#/$defs/agentInRole"
        },
        affiliation: {
          type: "array",
          minItems: 1,
          maxItems: 20,
          items: {
            $ref: "#/$defs/agentOrganization"
          },
          uniqueItems: true
        },
        knowsAbout: {
          type: "array",
          minItems: 1,
          maxItems: 100,
          items: {
            type: "string",
            minLength: 1,
            maxLength: 500
          },
          uniqueItems: true
        },
        credential: {
          type: "array",
          minItems: 1,
          maxItems: 50,
          items: {
            type: "string",
            minLength: 1,
            maxLength: 1e3
          },
          uniqueItems: true
        },
        additionalProperty: {
          $ref: "#/$defs/additionalPropertyArray"
        }
      },
      additionalProperties: false
    },
    agent: {
      oneOf: [
        {
          $ref: "#/$defs/agentPerson"
        },
        {
          $ref: "#/$defs/agentUnknown"
        },
        {
          $ref: "#/$defs/agentOrganization"
        },
        {
          $ref: "#/$defs/agentSoftware"
        },
        {
          $ref: "#/$defs/agentRole"
        }
      ]
    },
    agentArray: {
      type: "array",
      minItems: 1,
      maxItems: 100,
      items: {
        $ref: "#/$defs/agent"
      },
      uniqueItems: true
    },
    Reaction: {
      type: "object",
      title: "Reaction",
      required: [
        "@context",
        "@type",
        "@id",
        "creator",
        "dateCreated",
        "reactionType",
        "about",
        "text"
      ],
      properties: {
        "@context": {
          $ref: "#/$defs/contextRef"
        },
        "@id": {
          $ref: "#/$defs/entityIri"
        },
        name: {
          $ref: "#/$defs/plainText"
        },
        description: {
          $ref: "#/$defs/longText"
        },
        byline: {
          $ref: "#/$defs/bylineString"
        },
        creator: {
          $ref: "#/$defs/agentArray"
        },
        dateCreated: {
          $ref: "#/$defs/rfc3339DateTime"
        },
        dateModified: {
          $ref: "#/$defs/rfc3339DateTime"
        },
        datePublished: {
          $ref: "#/$defs/rfc3339DateTime"
        },
        license: {
          $ref: "#/$defs/httpsIri"
        },
        source: {
          $ref: "#/$defs/workReferenceArray"
        },
        sourceKey: {
          $ref: "#/$defs/sourceKey"
        },
        inLanguage: {
          $ref: "#/$defs/languageTagArray"
        },
        audience: {
          $ref: "#/$defs/stringArray"
        },
        genre: {
          $ref: "#/$defs/genreArray"
        },
        keywords: {
          $ref: "#/$defs/keywordsArray"
        },
        image: {
          $ref: "#/$defs/uriArray"
        },
        citation: {
          $ref: "#/$defs/uriArray"
        },
        additionalProperty: {
          $ref: "#/$defs/additionalPropertyArray"
        },
        "@type": {
          const: "Reaction"
        },
        reactionType: {
          $ref: "#/$defs/reactionType"
        },
        about: {
          $ref: "#/$defs/workReferenceArray"
        },
        isPartOf: {
          type: "array",
          minItems: 1,
          maxItems: 20,
          items: {
            $ref: "#/$defs/reactionListReference"
          },
          uniqueItems: true
        },
        text: {
          $ref: "#/$defs/bodyText"
        },
        textFormat: {
          $ref: "#/$defs/textFormat"
        }
      },
      patternProperties: {
        "^[a-z][a-z0-9-]*:[A-Za-z][A-Za-z0-9_-]*$": {
          $ref: "#/$defs/extensionValue"
        }
      },
      additionalProperties: false,
      allOf: [
        {
          if: {
            properties: {
              reactionType: {
                const: "Response"
              }
            },
            required: [
              "reactionType"
            ]
          },
          then: {
            properties: {
              text: {
                minLength: 1,
                pattern: "\\S"
              }
            }
          }
        }
      ],
      description: "A primary bibliographic reaction signal observed or issued by a person, organization, software agent, unknown agent, or role. A Reaction may represent listing/inclusion/selection/award candidacy (reactionType=Listing), an independent review/comment/critique (reactionType=Response), or an intentionally unclassified reaction (reactionType=Unspecified)."
    },
    ReactionAbstract: {
      type: "object",
      title: "ReactionAbstract",
      required: [
        "@context",
        "@type",
        "@id",
        "creator",
        "dateCreated",
        "text",
        "isBasedOn"
      ],
      properties: {
        "@context": {
          $ref: "#/$defs/contextRef"
        },
        "@id": {
          $ref: "#/$defs/entityIri"
        },
        name: {
          $ref: "#/$defs/plainText"
        },
        description: {
          $ref: "#/$defs/longText"
        },
        byline: {
          $ref: "#/$defs/bylineString"
        },
        creator: {
          $ref: "#/$defs/agentArray"
        },
        dateCreated: {
          $ref: "#/$defs/rfc3339DateTime"
        },
        dateModified: {
          $ref: "#/$defs/rfc3339DateTime"
        },
        datePublished: {
          $ref: "#/$defs/rfc3339DateTime"
        },
        license: {
          $ref: "#/$defs/httpsIri"
        },
        source: {
          $ref: "#/$defs/workReferenceArray"
        },
        sourceKey: {
          $ref: "#/$defs/sourceKey"
        },
        inLanguage: {
          $ref: "#/$defs/languageTagArray"
        },
        audience: {
          $ref: "#/$defs/stringArray"
        },
        genre: {
          $ref: "#/$defs/genreArray"
        },
        keywords: {
          $ref: "#/$defs/keywordsArray"
        },
        image: {
          $ref: "#/$defs/uriArray"
        },
        citation: {
          $ref: "#/$defs/uriArray"
        },
        additionalProperty: {
          $ref: "#/$defs/additionalPropertyArray"
        },
        "@type": {
          const: "ReactionAbstract"
        },
        text: {
          allOf: [
            {
              $ref: "#/$defs/bodyText"
            },
            {
              minLength: 1,
              pattern: "\\S"
            }
          ]
        },
        textFormat: {
          $ref: "#/$defs/textFormat"
        },
        isBasedOn: {
          type: "array",
          minItems: 1,
          maxItems: 20,
          items: {
            $ref: "#/$defs/basisReference"
          },
          uniqueItems: true
        }
      },
      patternProperties: {
        "^[a-z][a-z0-9-]*:[A-Za-z][A-Za-z0-9_-]*$": {
          $ref: "#/$defs/extensionValue"
        }
      },
      additionalProperties: false,
      description: "Optional derived summary artifact. A ReactionAbstract is not a primary observed reaction from a source. Use it only when a summary derived from a Reaction, ReactionList, another ReactionAbstract, or referenced CreativeWork must be exchanged as an independent object with its own creator, creation date, language, license, and provenance."
    },
    ReactionList: {
      type: "object",
      title: "ReactionList",
      required: [
        "@context",
        "@type",
        "@id",
        "creator",
        "dateCreated",
        "itemListElement"
      ],
      properties: {
        "@context": {
          $ref: "#/$defs/contextRef"
        },
        "@id": {
          $ref: "#/$defs/entityIri"
        },
        name: {
          $ref: "#/$defs/plainText"
        },
        description: {
          $ref: "#/$defs/longText"
        },
        byline: {
          $ref: "#/$defs/bylineString"
        },
        creator: {
          $ref: "#/$defs/agentArray"
        },
        dateCreated: {
          $ref: "#/$defs/rfc3339DateTime"
        },
        dateModified: {
          $ref: "#/$defs/rfc3339DateTime"
        },
        datePublished: {
          $ref: "#/$defs/rfc3339DateTime"
        },
        license: {
          $ref: "#/$defs/httpsIri"
        },
        source: {
          $ref: "#/$defs/workReferenceArray"
        },
        sourceKey: {
          $ref: "#/$defs/sourceKey"
        },
        inLanguage: {
          $ref: "#/$defs/languageTagArray"
        },
        audience: {
          $ref: "#/$defs/stringArray"
        },
        genre: {
          $ref: "#/$defs/genreArray"
        },
        keywords: {
          $ref: "#/$defs/keywordsArray"
        },
        image: {
          $ref: "#/$defs/uriArray"
        },
        citation: {
          $ref: "#/$defs/uriArray"
        },
        additionalProperty: {
          $ref: "#/$defs/additionalPropertyArray"
        },
        "@type": {
          const: "ReactionList"
        },
        itemListElement: {
          type: "array",
          minItems: 0,
          maxItems: 1e4,
          uniqueItems: true,
          items: {
            $ref: "#/$defs/reactionOrAbstractReference"
          }
        },
        selectionCriteria: {
          type: "array",
          minItems: 1,
          maxItems: 100,
          items: {
            type: "string",
            minLength: 1,
            maxLength: 2e3
          },
          uniqueItems: true
        }
      },
      patternProperties: {
        "^[a-z][a-z0-9-]*:[A-Za-z][A-Za-z0-9_-]*$": {
          $ref: "#/$defs/extensionValue"
        }
      },
      additionalProperties: false,
      description: "A curation container that groups Reaction and optional ReactionAbstract instances by reference. In canonical BRO, even simple list membership is represented as a Reaction with reactionType=Listing; ReactionList.itemListElement references those Reaction objects rather than raw Book/CreativeWork items."
    },
    ReactionNode: {
      type: "object",
      title: "Reaction",
      required: [
        "@type",
        "@id",
        "creator",
        "dateCreated",
        "reactionType",
        "about",
        "text"
      ],
      properties: {
        "@context": {
          $ref: "#/$defs/contextRef"
        },
        "@id": {
          $ref: "#/$defs/entityIri"
        },
        name: {
          $ref: "#/$defs/plainText"
        },
        description: {
          $ref: "#/$defs/longText"
        },
        byline: {
          $ref: "#/$defs/bylineString"
        },
        creator: {
          $ref: "#/$defs/agentArray"
        },
        dateCreated: {
          $ref: "#/$defs/rfc3339DateTime"
        },
        dateModified: {
          $ref: "#/$defs/rfc3339DateTime"
        },
        datePublished: {
          $ref: "#/$defs/rfc3339DateTime"
        },
        license: {
          $ref: "#/$defs/httpsIri"
        },
        source: {
          $ref: "#/$defs/workReferenceArray"
        },
        sourceKey: {
          $ref: "#/$defs/sourceKey"
        },
        inLanguage: {
          $ref: "#/$defs/languageTagArray"
        },
        audience: {
          $ref: "#/$defs/stringArray"
        },
        genre: {
          $ref: "#/$defs/genreArray"
        },
        keywords: {
          $ref: "#/$defs/keywordsArray"
        },
        image: {
          $ref: "#/$defs/uriArray"
        },
        citation: {
          $ref: "#/$defs/uriArray"
        },
        additionalProperty: {
          $ref: "#/$defs/additionalPropertyArray"
        },
        "@type": {
          const: "Reaction"
        },
        reactionType: {
          $ref: "#/$defs/reactionType"
        },
        about: {
          $ref: "#/$defs/workReferenceArray"
        },
        isPartOf: {
          type: "array",
          minItems: 1,
          maxItems: 20,
          items: {
            $ref: "#/$defs/reactionListReference"
          },
          uniqueItems: true
        },
        text: {
          $ref: "#/$defs/bodyText"
        },
        textFormat: {
          $ref: "#/$defs/textFormat"
        }
      },
      patternProperties: {
        "^[a-z][a-z0-9-]*:[A-Za-z][A-Za-z0-9_-]*$": {
          $ref: "#/$defs/extensionValue"
        }
      },
      additionalProperties: false,
      allOf: [
        {
          if: {
            properties: {
              reactionType: {
                const: "Response"
              }
            },
            required: [
              "reactionType"
            ]
          },
          then: {
            properties: {
              text: {
                minLength: 1,
                pattern: "\\S"
              }
            }
          }
        }
      ]
    },
    ReactionAbstractNode: {
      type: "object",
      title: "ReactionAbstract",
      required: [
        "@type",
        "@id",
        "creator",
        "dateCreated",
        "text",
        "isBasedOn"
      ],
      properties: {
        "@context": {
          $ref: "#/$defs/contextRef"
        },
        "@id": {
          $ref: "#/$defs/entityIri"
        },
        name: {
          $ref: "#/$defs/plainText"
        },
        description: {
          $ref: "#/$defs/longText"
        },
        byline: {
          $ref: "#/$defs/bylineString"
        },
        creator: {
          $ref: "#/$defs/agentArray"
        },
        dateCreated: {
          $ref: "#/$defs/rfc3339DateTime"
        },
        dateModified: {
          $ref: "#/$defs/rfc3339DateTime"
        },
        datePublished: {
          $ref: "#/$defs/rfc3339DateTime"
        },
        license: {
          $ref: "#/$defs/httpsIri"
        },
        source: {
          $ref: "#/$defs/workReferenceArray"
        },
        sourceKey: {
          $ref: "#/$defs/sourceKey"
        },
        inLanguage: {
          $ref: "#/$defs/languageTagArray"
        },
        audience: {
          $ref: "#/$defs/stringArray"
        },
        genre: {
          $ref: "#/$defs/genreArray"
        },
        keywords: {
          $ref: "#/$defs/keywordsArray"
        },
        image: {
          $ref: "#/$defs/uriArray"
        },
        citation: {
          $ref: "#/$defs/uriArray"
        },
        additionalProperty: {
          $ref: "#/$defs/additionalPropertyArray"
        },
        "@type": {
          const: "ReactionAbstract"
        },
        text: {
          allOf: [
            {
              $ref: "#/$defs/bodyText"
            },
            {
              minLength: 1,
              pattern: "\\S"
            }
          ]
        },
        textFormat: {
          $ref: "#/$defs/textFormat"
        },
        isBasedOn: {
          type: "array",
          minItems: 1,
          maxItems: 20,
          items: {
            $ref: "#/$defs/basisReference"
          },
          uniqueItems: true
        }
      },
      patternProperties: {
        "^[a-z][a-z0-9-]*:[A-Za-z][A-Za-z0-9_-]*$": {
          $ref: "#/$defs/extensionValue"
        }
      },
      additionalProperties: false
    },
    ReactionListNode: {
      type: "object",
      title: "ReactionList",
      required: [
        "@type",
        "@id",
        "creator",
        "dateCreated",
        "itemListElement"
      ],
      properties: {
        "@context": {
          $ref: "#/$defs/contextRef"
        },
        "@id": {
          $ref: "#/$defs/entityIri"
        },
        name: {
          $ref: "#/$defs/plainText"
        },
        description: {
          $ref: "#/$defs/longText"
        },
        byline: {
          $ref: "#/$defs/bylineString"
        },
        creator: {
          $ref: "#/$defs/agentArray"
        },
        dateCreated: {
          $ref: "#/$defs/rfc3339DateTime"
        },
        dateModified: {
          $ref: "#/$defs/rfc3339DateTime"
        },
        datePublished: {
          $ref: "#/$defs/rfc3339DateTime"
        },
        license: {
          $ref: "#/$defs/httpsIri"
        },
        source: {
          $ref: "#/$defs/workReferenceArray"
        },
        sourceKey: {
          $ref: "#/$defs/sourceKey"
        },
        inLanguage: {
          $ref: "#/$defs/languageTagArray"
        },
        audience: {
          $ref: "#/$defs/stringArray"
        },
        genre: {
          $ref: "#/$defs/genreArray"
        },
        keywords: {
          $ref: "#/$defs/keywordsArray"
        },
        image: {
          $ref: "#/$defs/uriArray"
        },
        citation: {
          $ref: "#/$defs/uriArray"
        },
        additionalProperty: {
          $ref: "#/$defs/additionalPropertyArray"
        },
        "@type": {
          const: "ReactionList"
        },
        itemListElement: {
          type: "array",
          minItems: 0,
          maxItems: 1e4,
          uniqueItems: true,
          items: {
            $ref: "#/$defs/reactionOrAbstractReference"
          }
        },
        selectionCriteria: {
          type: "array",
          minItems: 1,
          maxItems: 100,
          items: {
            type: "string",
            minLength: 1,
            maxLength: 2e3
          },
          uniqueItems: true
        }
      },
      patternProperties: {
        "^[a-z][a-z0-9-]*:[A-Za-z][A-Za-z0-9_-]*$": {
          $ref: "#/$defs/extensionValue"
        }
      },
      additionalProperties: false
    },
    graphNode: {
      oneOf: [
        {
          $ref: "#/$defs/ReactionNode"
        },
        {
          $ref: "#/$defs/ReactionAbstractNode"
        },
        {
          $ref: "#/$defs/ReactionListNode"
        }
      ]
    },
    BROGraph: {
      type: "object",
      title: "BROGraph",
      description: "JSON-LD graph document containing a connected exchange set, such as a ReactionList and its Listing/Response Reactions plus optional derived ReactionAbstract summaries.",
      required: [
        "@context",
        "@graph"
      ],
      properties: {
        "@context": {
          $ref: "#/$defs/contextRef"
        },
        "@id": {
          $ref: "#/$defs/entityIri"
        },
        "@graph": {
          type: "array",
          minItems: 1,
          maxItems: 2e4,
          items: {
            $ref: "#/$defs/graphNode"
          }
        }
      },
      additionalProperties: false
    }
  }
};

// src/lib/bro-context.ts
var broV1Context = {
  "@context": {
    "@version": 1.1,
    "@protected": true,
    "@base": "https://schema.slat.or.kr/bro/v1.0/instances/",
    schema: "https://schema.org/",
    bro: "https://schema.slat.or.kr/bro/v1.0/vocab#",
    xsd: "http://www.w3.org/2001/XMLSchema#",
    rdfs: "http://www.w3.org/2000/01/rdf-schema#",
    prov: "http://www.w3.org/ns/prov#",
    dc: "http://purl.org/dc/elements/1.1/",
    dcterms: "http://purl.org/dc/terms/",
    bibo: "http://purl.org/ontology/bibo/",
    bf: "http://id.loc.gov/ontologies/bibframe/",
    nlon: "http://lod.nl.go.kr/ontology/",
    Reaction: "bro:Reaction",
    ReactionAbstract: "bro:ReactionAbstract",
    ReactionList: "bro:ReactionList",
    UnknownAgent: "bro:UnknownAgent",
    Person: "schema:Person",
    Organization: "schema:Organization",
    Library: "schema:Library",
    GovernmentOrganization: "schema:GovernmentOrganization",
    EducationalOrganization: "schema:EducationalOrganization",
    School: "schema:School",
    Corporation: "schema:Corporation",
    SoftwareApplication: "schema:SoftwareApplication",
    Role: "schema:Role",
    PropertyValue: "schema:PropertyValue",
    CreativeWork: "schema:CreativeWork",
    Book: "schema:Book",
    Article: "schema:Article",
    ScholarlyArticle: "schema:ScholarlyArticle",
    WebPage: "schema:WebPage",
    Dataset: "schema:Dataset",
    Chapter: "schema:Chapter",
    Report: "schema:Report",
    Review: "schema:Review",
    Recommendation: "schema:Recommendation",
    Response: "bro:Response",
    Listing: "bro:Listing",
    Unspecified: "bro:Unspecified",
    reactionType: {
      "@id": "bro:reactionType",
      "@type": "@vocab"
    },
    name: "schema:name",
    description: "schema:description",
    byline: "bro:byline",
    text: "schema:text",
    textFormat: "schema:encodingFormat",
    creator: {
      "@id": "schema:creator",
      "@container": "@set"
    },
    agent: "schema:agent",
    roleName: "schema:roleName",
    jobTitle: "schema:jobTitle",
    affiliation: {
      "@id": "schema:affiliation",
      "@container": "@set"
    },
    knowsAbout: {
      "@id": "schema:knowsAbout",
      "@container": "@set"
    },
    credential: {
      "@id": "bro:credential",
      "@container": "@set"
    },
    softwareVersion: "schema:softwareVersion",
    about: {
      "@id": "schema:about",
      "@container": "@set"
    },
    isPartOf: {
      "@id": "schema:isPartOf",
      "@container": "@set"
    },
    isBasedOn: {
      "@id": "schema:isBasedOn",
      "@container": "@set"
    },
    itemListElement: {
      "@id": "schema:itemListElement",
      "@container": "@list"
    },
    selectionCriteria: {
      "@id": "bro:selectionCriteria",
      "@container": "@set"
    },
    source: {
      "@id": "prov:wasDerivedFrom",
      "@container": "@set"
    },
    sourceKey: "bro:sourceKey",
    identifier: {
      "@id": "schema:identifier",
      "@container": "@set"
    },
    creatorName: "bro:creatorName",
    publisherName: "bro:publisherName",
    bookEdition: "schema:bookEdition",
    datePublished: {
      "@id": "schema:datePublished",
      "@type": "xsd:dateTime"
    },
    dateCreated: {
      "@id": "schema:dateCreated",
      "@type": "xsd:dateTime"
    },
    dateModified: {
      "@id": "schema:dateModified",
      "@type": "xsd:dateTime"
    },
    startDate: {
      "@id": "schema:startDate",
      "@type": "xsd:date"
    },
    endDate: {
      "@id": "schema:endDate",
      "@type": "xsd:date"
    },
    license: {
      "@id": "schema:license",
      "@type": "@id"
    },
    url: {
      "@id": "schema:url",
      "@type": "@id"
    },
    image: {
      "@id": "schema:image",
      "@type": "@id",
      "@container": "@set"
    },
    citation: {
      "@id": "schema:citation",
      "@type": "@id",
      "@container": "@set"
    },
    inLanguage: {
      "@id": "schema:inLanguage",
      "@container": "@set"
    },
    audience: {
      "@id": "schema:audience",
      "@container": "@set"
    },
    genre: {
      "@id": "schema:genre",
      "@container": "@set"
    },
    keywords: {
      "@id": "schema:keywords",
      "@container": "@set"
    },
    additionalProperty: {
      "@id": "schema:additionalProperty",
      "@container": "@set"
    },
    value: "schema:value",
    valueReference: "schema:valueReference",
    propertyID: "schema:propertyID",
    unitCode: "schema:unitCode",
    unitText: "schema:unitText"
  }
};

// src/lib/bro-vocab.ts
var broV1VocabTurtle = `@prefix bro:    <https://schema.slat.or.kr/bro/v1.0/vocab#> .
@prefix schema: <https://schema.org/> .
@prefix rdfs:   <http://www.w3.org/2000/01/rdf-schema#> .
@prefix rdf:    <http://www.w3.org/1999/02/22-rdf-syntax-ns#> .
@prefix prov:   <http://www.w3.org/ns/prov#> .

bro:Reaction a rdfs:Class ;
  rdfs:subClassOf schema:CreativeWork ;
  rdfs:comment "A bibliographic reaction signal: listing, recommendation, selection, review, comment, or unspecified response concerning one or more external works."@en .

bro:ReactionAbstract a rdfs:Class ;
  rdfs:subClassOf schema:CreativeWork ;
  rdfs:comment "An optional derived summary artifact, not a primary observed reaction. Use when a summary derived from a Reaction, ReactionList, another ReactionAbstract, or external bibliographic resource must be exchanged with its own provenance."@en .

bro:ReactionList a rdfs:Class ;
  rdfs:subClassOf schema:ItemList ;
  rdfs:comment "A curation container that aggregates Reaction and/or ReactionAbstract entities by reference."@en .

bro:UnknownAgent a rdfs:Class ;
  rdfs:subClassOf schema:Agent ;
  rdfs:comment "Explicit declaration that the publisher cannot identify the responsible agent. Each instance is a fresh blank node by design."@en .

bro:ReactionType a rdfs:Class .

bro:reactionType a rdf:Property ;
  rdfs:subPropertyOf schema:additionalType ;
  rdfs:comment "Primary information function of a Reaction: Response, Listing, or Unspecified."@en .

bro:Response a bro:ReactionType ;
  rdfs:comment "A Reaction whose primary function is an independent review, comment, critique, assessment, or response body."@en .

bro:Listing a bro:ReactionType ;
  rdfs:comment "A Reaction whose primary function is to record that a resource was listed, selected, recommended, awarded, shortlisted, or otherwise included in a curation context. Text may be empty or contain a rationale."@en .

bro:Unspecified a bro:ReactionType ;
  rdfs:comment "A Reaction whose source does not allow the publisher to classify the primary function safely."@en .

bro:byline a rdf:Property ;
  rdfs:subPropertyOf schema:creditText ;
  rdfs:comment "Free-form attribution string preserved from the source."@en .

bro:sourceKey a rdf:Property ;
  rdfs:subPropertyOf schema:identifier ;
  rdfs:comment "Source-local key for idempotent re-ingestion. Not a global bibliographic identifier."@en .

bro:selectionCriteria a rdf:Property ;
  rdfs:subPropertyOf schema:description ;
  rdfs:comment "Human-readable criterion used by a list or selection program."@en .

bro:credential a rdf:Property ;
  rdfs:comment "Plain-text credential or authority clue asserted by the publisher or preserved from source. It is evidence, not proof."@en .

bro:creatorName a rdf:Property ;
  rdfs:subPropertyOf schema:creator ;
  rdfs:comment "Human-readable creator or author display string for lightweight or unresolved bibliographic references."@en .

bro:publisherName a rdf:Property ;
  rdfs:subPropertyOf schema:publisher ;
  rdfs:comment "Human-readable publisher display string for lightweight bibliographic references."@en .
`;

// src/validator/index.ts
var import_json_schema = require("@cfworker/json-schema");

// src/lib/normalize.ts
var IDENTIFIER_KEYS = /* @__PURE__ */ new Set(["@id", "identifier", "license", "propertyID", "valueReference"]);
var URI_SCHEME_NORMALIZERS = [
  [/^urn:uuid:/i, "urn:uuid:"],
  [/^urn:isbn:/i, "urn:isbn:"],
  [/^mailto:/i, "mailto:"],
  [/^https:\/\/doi\.org\//i, "https://doi.org/"],
  [/^https:\/\/orcid\.org\//i, "https://orcid.org/"]
];
function normalizeIdentifier(value) {
  for (const [pattern, canonicalPrefix] of URI_SCHEME_NORMALIZERS) {
    const match = value.match(pattern);
    if (match) {
      return canonicalPrefix + value.slice(match[0].length);
    }
  }
  return value;
}
function normalizeUrnScheme(value) {
  return normalizeIdentifier(value);
}
function normalizePayload(payload) {
  if (payload === null || payload === void 0) return payload;
  if (Array.isArray(payload)) {
    for (let index = 0; index < payload.length; index += 1) {
      payload[index] = normalizePayload(payload[index]);
    }
    return payload;
  }
  if (typeof payload === "object") {
    const objectPayload = payload;
    for (const key of Object.keys(objectPayload)) {
      const value = objectPayload[key];
      if (IDENTIFIER_KEYS.has(key) && typeof value === "string") {
        objectPayload[key] = normalizeIdentifier(value);
      } else if (value && typeof value === "object") {
        normalizePayload(value);
      }
    }
  }
  return payload;
}
function cloneAndNormalizePayload(payload) {
  const cloned = typeof structuredClone === "function" ? structuredClone(payload) : JSON.parse(JSON.stringify(payload));
  return normalizePayload(cloned);
}

// src/lib/bro-types.ts
var BRO_CONTEXT_IRI = "https://schema.slat.or.kr/bro/v1.0/context.jsonld";
var BRO_SCHEMA_IRI = "https://schema.slat.or.kr/bro/v1.0/schema.json";
var BRO_VOCAB_IRI = "https://schema.slat.or.kr/bro/v1.0/vocab#";
var BRO_ENTITY_TYPES = [
  "Reaction",
  "ReactionAbstract",
  "ReactionList"
];
var REACTION_TYPES = [
  "Response",
  "Listing",
  "Unspecified"
];
var AGENT_TYPES = [
  "Person",
  "UnknownAgent",
  "Organization",
  "Library",
  "GovernmentOrganization",
  "EducationalOrganization",
  "School",
  "Corporation",
  "SoftwareApplication",
  "Role"
];
function isBroNode(value) {
  if (!value || typeof value !== "object") return false;
  const type = value["@type"];
  return type === "Reaction" || type === "ReactionAbstract" || type === "ReactionList";
}
function isBroGraph(value) {
  return Boolean(value && typeof value === "object" && Array.isArray(value["@graph"]));
}
function isBroPayload(value) {
  return isBroNode(value) || isBroGraph(value);
}
function isReaction(value) {
  return isBroNode(value) && value["@type"] === "Reaction";
}
function isReactionAbstract(value) {
  return isBroNode(value) && value["@type"] === "ReactionAbstract";
}
function isReactionList(value) {
  return isBroNode(value) && value["@type"] === "ReactionList";
}

// src/validator/index.ts
var validator = new import_json_schema.Validator(bro_v1_schema_default, "2020-12", false);
function getTextPayload(value) {
  if (!value || typeof value !== "object") return null;
  const record = value;
  return typeof record.text === "string" ? record.text : null;
}
function hasForbiddenFrontMatter(text) {
  const withoutBom = text.replace(/^\uFEFF/, "");
  return /^(---|\+\+\+)\s*(?:\r?\n|$)/.test(withoutBom);
}
function collectApplicationErrors(payload) {
  const errors = [];
  function visit(value, path) {
    const text = getTextPayload(value);
    if (text !== null && hasForbiddenFrontMatter(text)) {
      errors.push({
        location: `${path}/text`,
        instanceLocation: `${path}/text`,
        keyword: "bro-no-frontmatter",
        message: "BRO text MUST NOT begin with a YAML/TOML front-matter block.",
        error: "BRO text MUST NOT begin with a YAML/TOML front-matter block."
      });
    }
    if (value && typeof value === "object" && Array.isArray(value["@graph"])) {
      value["@graph"].forEach((node, index) => visit(node, `${path}/@graph/${index}`));
    }
  }
  visit(payload, "");
  return errors;
}
function normalizeSchemaError(error) {
  const record = error;
  const location = typeof record.instanceLocation === "string" ? record.instanceLocation : typeof record.location === "string" ? record.location : "/";
  const message = typeof record.error === "string" ? record.error : typeof record.message === "string" ? record.message : "Schema validation failed.";
  return {
    location,
    instanceLocation: location,
    keyword: typeof record.keyword === "string" ? record.keyword : void 0,
    message,
    error: message
  };
}
function validateBroSchema(data, options = {}) {
  const shouldNormalize = options.normalize !== false;
  const payload = shouldNormalize ? options.mutate ? normalizePayload(data) : cloneAndNormalizePayload(data) : data;
  const result = validator.validate(payload);
  const schemaErrors = result.valid ? [] : result.errors.map(normalizeSchemaError);
  const applicationErrors = result.valid ? collectApplicationErrors(payload) : [];
  const errors = [...schemaErrors, ...applicationErrors];
  return {
    valid: errors.length === 0,
    errors,
    ...options.includeNormalizedPayload ? { normalizedPayload: payload } : {}
  };
}
function assertBroSchema(data, options = {}) {
  const result = validateBroSchema(data, options);
  if (!result.valid) {
    const first = result.errors[0];
    throw new Error(first ? `${first.location}: ${first.message}` : "Invalid BRO payload.");
  }
}

// src/lib/bibframe-converter.ts
function agentLabel(agent) {
  if (agent["@type"] === "Role") return agent.roleName || agentLabel(agent.agent);
  if ("name" in agent && agent.name) return agent.name;
  return "Unknown agent";
}
function agentType(agent) {
  const concreteAgent = agent["@type"] === "Role" ? agent.agent : agent;
  switch (concreteAgent["@type"]) {
    case "Person":
      return "bf:Person";
    case "UnknownAgent":
      return "bf:Agent";
    case "Organization":
    case "Library":
    case "GovernmentOrganization":
    case "EducationalOrganization":
    case "School":
      return "bf:Organization";
    case "Corporation":
    case "SoftwareApplication":
      return "bf:Agent";
    default:
      return "bf:Agent";
  }
}
function agentId(agent) {
  const concreteAgent = agent["@type"] === "Role" ? agent.agent : agent;
  return "@id" in concreteAgent ? concreteAgent["@id"] : void 0;
}
function contributionFromAgent(agent) {
  const contribution = {
    "@type": "bf:Contribution",
    "bf:agent": {
      "@type": agentType(agent),
      "rdfs:label": agentLabel(agent)
    }
  };
  const id = agentId(agent);
  if (id) contribution["bf:agent"]["@id"] = id;
  if (agent["@type"] === "Role" && agent.roleName) {
    contribution["bf:role"] = {
      "@type": "bf:Role",
      "rdfs:label": agent.roleName
    };
  }
  return contribution;
}
function isEntityReference(reference) {
  return "@id" in reference && (reference["@type"] === "Reaction" || reference["@type"] === "ReactionAbstract" || reference["@type"] === "ReactionList");
}
function identifierLabel(identifier) {
  if (typeof identifier === "string") return identifier;
  const authority = identifier.propertyID ?? identifier.name ?? "PropertyValue";
  return `${authority}:${String(identifier.value)}`;
}
function identifierValues(reference) {
  const identifier = reference.identifier;
  if (!identifier) return [];
  if (Array.isArray(identifier)) return identifier.map(identifierLabel);
  return [identifierLabel(identifier)];
}
function instanceFromWorkReference(reference) {
  const identifiers = identifierValues(reference);
  const instance = {
    "@type": "bf:Instance",
    ...reference.name ? { "rdfs:label": reference.name } : {},
    ...identifiers.length > 0 ? {
      "bf:identifiedBy": identifiers.map((identifier) => ({
        "@type": "bf:Identifier",
        "rdf:value": identifier
      }))
    } : {}
  };
  if (identifiers[0]) {
    instance["bf:instanceOf"] = {
      "@id": identifiers[0],
      "@type": `schema:${reference["@type"]}`
    };
  }
  return instance;
}
function instanceFromReference(reference) {
  if (isEntityReference(reference)) {
    return {
      "@type": "bf:Instance",
      "bf:instanceOf": {
        "@id": reference["@id"],
        "@type": reference["@type"] ? `bro:${reference["@type"]}` : "bf:Work"
      }
    };
  }
  return instanceFromWorkReference(reference);
}
function itemNodeFromReference(reference) {
  return {
    "@id": reference["@id"],
    "@type": `bro:${reference["@type"]}`
  };
}
function convertBroNodeToBibframe(payload) {
  const base = {
    "@context": {
      bf: "http://id.loc.gov/ontologies/bibframe/",
      rdf: "http://www.w3.org/1999/02/22-rdf-syntax-ns#",
      rdfs: "http://www.w3.org/2000/01/rdf-schema#",
      schema: "https://schema.org/",
      bro: "https://schema.slat.or.kr/bro/v1.0/vocab#"
    },
    "@type": ["bf:Work"],
    "@id": payload["@id"],
    "bf:originDate": payload.dateCreated,
    ...payload.dateModified ? { "bf:changeDate": payload.dateModified } : {},
    "bf:contribution": payload.creator.map(contributionFromAgent),
    ...payload.name ? {
      "bf:title": {
        "@type": "bf:Title",
        "bf:mainTitle": payload.name
      }
    } : {}
  };
  if (payload["@type"] === "Reaction") {
    return {
      ...base,
      "@type": ["bf:Work", "bf:Review", "bro:Reaction"],
      "bf:reviewOf": payload.about.map(instanceFromReference),
      "bro:reactionType": `bro:${payload.reactionType}`,
      "bf:note": {
        "@type": "bf:Note",
        "rdfs:label": payload.text
      }
    };
  }
  if (payload["@type"] === "ReactionAbstract") {
    return {
      ...base,
      "@type": ["bf:Work", "bf:Summary", "bro:ReactionAbstract"],
      "bf:summaryOf": payload.isBasedOn.map(instanceFromReference),
      "bf:note": {
        "@type": "bf:Note",
        "rdfs:label": payload.text
      }
    };
  }
  return {
    ...base,
    "@type": ["bf:Work", "bf:Collection", "bro:ReactionList"],
    "bf:hasItem": payload.itemListElement.map(itemNodeFromReference)
  };
}
function convertBroToBibframe(payload) {
  if ("@graph" in payload) {
    return payload["@graph"].map(convertBroNodeToBibframe);
  }
  return convertBroNodeToBibframe(payload);
}

// src/lib/markdown-renderer.ts
function yamlScalar(value) {
  if (value === null || value === void 0) return '""';
  if (typeof value === "number" || typeof value === "boolean") return String(value);
  const text = String(value);
  if (text === "" || text.trim() !== text || /[:#[\]{}&*!|>'"%@`,\n]/.test(text)) {
    return JSON.stringify(text);
  }
  return text;
}
function yamlStringArray(key, values) {
  if (!values || values.length === 0) return [];
  return [key, ...values.map((value) => `  - ${yamlScalar(value)}`)];
}
function renderIdentifierValue(identifier, indent) {
  if (typeof identifier === "string") return [`${indent}- ${yamlScalar(identifier)}`];
  const lines = [`${indent}- type: ${yamlScalar(identifier["@type"])}`];
  if (identifier.name) lines.push(`${indent}  name: ${yamlScalar(identifier.name)}`);
  if (identifier.propertyID) lines.push(`${indent}  propertyID: ${yamlScalar(identifier.propertyID)}`);
  lines.push(`${indent}  value: ${yamlScalar(identifier.value)}`);
  if (identifier.valueReference) lines.push(`${indent}  valueReference: ${yamlScalar(identifier.valueReference)}`);
  return lines;
}
function renderIdentifierSet(reference, indent) {
  if (!reference.identifier) return [];
  const identifiers = Array.isArray(reference.identifier) ? reference.identifier : [reference.identifier];
  return [`${indent}identifier:`, ...identifiers.flatMap((identifier) => renderIdentifierValue(identifier, `${indent}  `))];
}
function renderWorkReference(reference, indent) {
  const lines = [`${indent}- type: ${yamlScalar(reference["@type"])}`];
  if (reference["@id"]) lines.push(`${indent}  id: ${yamlScalar(reference["@id"])}`);
  lines.push(...renderIdentifierSet(reference, `${indent}  `));
  if (reference.name) lines.push(`${indent}  name: ${yamlScalar(reference.name)}`);
  if (reference.creatorName) lines.push(`${indent}  creatorName: ${yamlScalar(reference.creatorName)}`);
  if (reference.publisherName) lines.push(`${indent}  publisherName: ${yamlScalar(reference.publisherName)}`);
  if (reference.datePublished) lines.push(`${indent}  datePublished: ${yamlScalar(reference.datePublished)}`);
  if (reference.bookEdition) lines.push(`${indent}  bookEdition: ${yamlScalar(reference.bookEdition)}`);
  if (reference.url) lines.push(`${indent}  url: ${yamlScalar(reference.url)}`);
  lines.push(...yamlStringArray(`${indent}  inLanguage:`, reference.inLanguage));
  lines.push(...yamlStringArray(`${indent}  keywords:`, reference.keywords));
  lines.push(...renderAdditionalProperty(reference.additionalProperty).map((line) => `${indent}  ${line}`));
  return lines;
}
function isBroEntityReference(reference) {
  return "@id" in reference && (reference["@type"] === "Reaction" || reference["@type"] === "ReactionAbstract" || reference["@type"] === "ReactionList");
}
function renderReferences(key, references) {
  if (!references || references.length === 0) return [];
  const lines = [`${key}:`];
  for (const reference of references) {
    if (isBroEntityReference(reference)) {
      lines.push(`  - id: ${yamlScalar(reference["@id"])}`);
      if (reference["@type"]) lines.push(`    type: ${yamlScalar(reference["@type"])}`);
    } else {
      lines.push(...renderWorkReference(reference, "  "));
    }
  }
  return lines;
}
function renderAgent(agent, indent = "  ") {
  const lines = [`${indent}- type: ${yamlScalar(agent["@type"])}`];
  if ("name" in agent && agent.name) lines.push(`${indent}  name: ${yamlScalar(agent.name)}`);
  if ("@id" in agent && agent["@id"]) lines.push(`${indent}  id: ${yamlScalar(agent["@id"])}`);
  if ("jobTitle" in agent && agent.jobTitle) lines.push(`${indent}  jobTitle: ${yamlScalar(agent.jobTitle)}`);
  if ("affiliation" in agent && agent.affiliation) {
    lines.push(`${indent}  affiliation:`);
    for (const affiliation of agent.affiliation) lines.push(...renderAgent(affiliation, `${indent}    `));
  }
  if ("knowsAbout" in agent) lines.push(...yamlStringArray(`${indent}  knowsAbout:`, agent.knowsAbout));
  if ("credential" in agent) lines.push(...yamlStringArray(`${indent}  credential:`, agent.credential));
  if (agent["@type"] === "SoftwareApplication" && agent.softwareVersion) {
    lines.push(`${indent}  softwareVersion: ${yamlScalar(agent.softwareVersion)}`);
  }
  if (agent["@type"] === "Role") {
    if (agent.roleName) lines.push(`${indent}  roleName: ${yamlScalar(agent.roleName)}`);
    if (agent.startDate) lines.push(`${indent}  startDate: ${yamlScalar(agent.startDate)}`);
    if (agent.endDate) lines.push(`${indent}  endDate: ${yamlScalar(agent.endDate)}`);
    lines.push(`${indent}  agent:`);
    const nested = renderAgent(agent.agent, `${indent}    `);
    lines.push(...nested.map((line) => line.replace(`${indent}    - `, `${indent}    `)));
  }
  if ("additionalProperty" in agent) {
    lines.push(...renderAdditionalProperty(agent.additionalProperty).map((line) => `${indent}  ${line}`));
  }
  return lines;
}
function renderCreators(creators) {
  return ["creator:", ...creators.flatMap((creator) => renderAgent(creator))];
}
function renderAdditionalProperty(properties) {
  if (!properties || properties.length === 0) return [];
  const lines = ["additionalProperty:"];
  for (const property of properties) {
    lines.push(`  - name: ${yamlScalar(property.name)}`);
    lines.push(`    value: ${yamlScalar(JSON.stringify(property.value))}`);
    if (property.propertyID) lines.push(`    propertyID: ${yamlScalar(property.propertyID)}`);
    if (property.valueReference) lines.push(`    valueReference: ${yamlScalar(property.valueReference)}`);
    if (property.unitCode) lines.push(`    unitCode: ${yamlScalar(property.unitCode)}`);
    if (property.unitText) lines.push(`    unitText: ${yamlScalar(property.unitText)}`);
  }
  return lines;
}
function renderBroNodeToMarkdown(payload) {
  const frontmatter = [
    `id: ${yamlScalar(payload["@id"])}`,
    `type: ${yamlScalar(payload["@type"])}`,
    `dateCreated: ${yamlScalar(payload.dateCreated)}`
  ];
  if (payload.name) frontmatter.push(`name: ${yamlScalar(payload.name)}`);
  if (payload.description) frontmatter.push(`description: ${yamlScalar(payload.description)}`);
  if (payload.byline) frontmatter.push(`byline: ${yamlScalar(payload.byline)}`);
  if (payload.dateModified) frontmatter.push(`dateModified: ${yamlScalar(payload.dateModified)}`);
  if (payload.datePublished) frontmatter.push(`datePublished: ${yamlScalar(payload.datePublished)}`);
  if (payload.license) frontmatter.push(`license: ${yamlScalar(payload.license)}`);
  if (payload.sourceKey) frontmatter.push(`sourceKey: ${yamlScalar(payload.sourceKey)}`);
  if (payload.source) {
    frontmatter.push("source:");
    for (const source of payload.source) frontmatter.push(...renderWorkReference(source, "  "));
  }
  if (payload["@type"] === "Reaction") {
    frontmatter.push(`reactionType: ${yamlScalar(payload.reactionType)}`);
    frontmatter.push(...renderReferences("about", payload.about));
    frontmatter.push(...renderReferences("isPartOf", payload.isPartOf));
  }
  if (payload["@type"] === "ReactionAbstract") {
    frontmatter.push(...renderReferences("isBasedOn", payload.isBasedOn));
  }
  if (payload["@type"] === "ReactionList") {
    frontmatter.push("itemListElement:");
    for (const element of payload.itemListElement) {
      if ("@id" in element) {
        frontmatter.push(`  - id: ${yamlScalar(element["@id"])}`);
        if (element["@type"]) frontmatter.push(`    type: ${yamlScalar(element["@type"])}`);
      }
    }
    frontmatter.push(...yamlStringArray("selectionCriteria:", payload.selectionCriteria));
  }
  frontmatter.push(...renderCreators(payload.creator));
  frontmatter.push(...yamlStringArray("inLanguage:", payload.inLanguage));
  frontmatter.push(...yamlStringArray("audience:", payload.audience));
  frontmatter.push(...yamlStringArray("genre:", payload.genre));
  frontmatter.push(...yamlStringArray("keywords:", payload.keywords));
  if ("image" in payload) frontmatter.push(...yamlStringArray("image:", payload.image));
  if ("citation" in payload) frontmatter.push(...yamlStringArray("citation:", payload.citation));
  frontmatter.push(...renderAdditionalProperty(payload.additionalProperty));
  const metadata = `---
${frontmatter.join("\n")}
---`;
  const body = "text" in payload ? payload.text : "";
  return body ? `${metadata}

${body}` : metadata;
}
function renderBroToMarkdown(payload) {
  if ("@graph" in payload) {
    return payload["@graph"].map(renderBroNodeToMarkdown).join("\n\n");
  }
  return renderBroNodeToMarkdown(payload);
}

// src/lib/komarc-converter.ts
var BRO_SCHEMA_URI = "https://schema.slat.or.kr/bro/v1.0/schema.json";
function yyyymmdd(dateTime) {
  return dateTime.slice(0, 10).replace(/-/g, "");
}
function isEntityReference2(reference) {
  return "@id" in reference && (reference["@type"] === "Reaction" || reference["@type"] === "ReactionAbstract" || reference["@type"] === "ReactionList");
}
function identifierLabel2(identifier) {
  if (typeof identifier === "string") return identifier;
  const authority = identifier.propertyID ?? identifier.name ?? "PropertyValue";
  return `${authority}:${String(identifier.value)}`;
}
function identifierValues2(reference) {
  const identifier = reference.identifier;
  if (!identifier) return [];
  if (Array.isArray(identifier)) return identifier.map(identifierLabel2);
  return [identifierLabel2(identifier)];
}
function identifierField(identifier) {
  if (identifier.startsWith("urn:isbn:")) {
    return {
      tag: "020",
      indicator1: " ",
      indicator2: " ",
      subfields: [{ code: "a", value: identifier.replace(/^urn:isbn:/, "") }]
    };
  }
  return {
    tag: "024",
    indicator1: "8",
    indicator2: " ",
    subfields: [{ code: "a", value: identifier }]
  };
}
function titleField(reference) {
  if (!reference.name) return null;
  const subfields = [{ code: "a", value: reference.name }];
  if (reference.creatorName) {
    const creators = Array.isArray(reference.creatorName) ? reference.creatorName : [reference.creatorName];
    for (const creator of creators) subfields.push({ code: "c", value: creator });
  }
  if (reference.publisherName) subfields.push({ code: "b", value: reference.publisherName });
  if (reference.datePublished) subfields.push({ code: "d", value: reference.datePublished });
  return {
    tag: "245",
    indicator1: "0",
    indicator2: "0",
    subfields
  };
}
function referenceFields(reference) {
  if (isEntityReference2(reference)) return [identifierField(reference["@id"])];
  const fields = identifierValues2(reference).map(identifierField);
  const title = titleField(reference);
  if (title) fields.push(title);
  return fields;
}
function base552(payload) {
  const subfields = [
    { code: "h", value: BRO_SCHEMA_URI },
    { code: "u", value: payload["@id"] },
    { code: "k", value: yyyymmdd(payload.dateCreated) }
  ];
  if (payload.name) subfields.push({ code: "b", value: payload.name });
  if (payload.byline) subfields.push({ code: "c", value: payload.byline });
  if (payload.dateModified) subfields.push({ code: "m", value: yyyymmdd(payload.dateModified) });
  return subfields;
}
function text520ForReaction(reaction) {
  const indicator1 = reaction.reactionType === "Listing" ? "4" : "1";
  const subfields = [{ code: "a", value: reaction.text }];
  if (reaction.byline) subfields.push({ code: "c", value: reaction.byline });
  for (const uri of reaction.citation ?? []) subfields.push({ code: "u", value: uri });
  return {
    tag: "520",
    indicator1,
    indicator2: " ",
    subfields
  };
}
function text520ForAbstract(abstractPayload) {
  const subfields = [{ code: "a", value: abstractPayload.text }];
  if (abstractPayload.byline) subfields.push({ code: "c", value: abstractPayload.byline });
  for (const uri of abstractPayload.citation ?? []) subfields.push({ code: "u", value: uri });
  return {
    tag: "520",
    indicator1: " ",
    indicator2: " ",
    subfields
  };
}
function convertReactionToKomarc(reaction) {
  return {
    controlFields: [],
    dataFields: [
      ...reaction.about.flatMap(referenceFields),
      text520ForReaction(reaction),
      {
        tag: "552",
        indicator1: " ",
        indicator2: " ",
        subfields: [
          ...base552(reaction),
          { code: "t", value: reaction.reactionType }
        ]
      }
    ]
  };
}
function convertAbstractToKomarc(abstractPayload) {
  return {
    controlFields: [],
    dataFields: [
      ...abstractPayload.isBasedOn.flatMap(referenceFields),
      text520ForAbstract(abstractPayload),
      {
        tag: "552",
        indicator1: " ",
        indicator2: " ",
        subfields: base552(abstractPayload)
      }
    ]
  };
}
function convertListToKomarc(list) {
  if (list.itemListElement.length === 0) {
    return [
      {
        controlFields: [],
        dataFields: [
          {
            tag: "552",
            indicator1: " ",
            indicator2: " ",
            subfields: base552(list)
          }
        ]
      }
    ];
  }
  return list.itemListElement.map((element) => {
    const referenceSubfields = [
      { code: "u", value: element["@id"] },
      { code: "t", value: element["@type"] }
    ];
    return {
      controlFields: [],
      dataFields: [
        ...referenceFields(element),
        {
          tag: "552",
          indicator1: " ",
          indicator2: " ",
          subfields: [
            ...base552(list),
            ...referenceSubfields
          ]
        }
      ]
    };
  });
}
function convertBroNodeToKomarc(payload) {
  switch (payload["@type"]) {
    case "Reaction":
      return convertReactionToKomarc(payload);
    case "ReactionAbstract":
      return convertAbstractToKomarc(payload);
    case "ReactionList":
      return convertListToKomarc(payload);
  }
}
function convertBroToKomarc(payload) {
  if ("@graph" in payload) {
    return payload["@graph"].flatMap((node) => {
      const converted = convertBroNodeToKomarc(node);
      return Array.isArray(converted) ? converted : [converted];
    });
  }
  return convertBroNodeToKomarc(payload);
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  AGENT_TYPES,
  BRO_CONTEXT_IRI,
  BRO_ENTITY_TYPES,
  BRO_SCHEMA_IRI,
  BRO_VOCAB_IRI,
  BroV1Context,
  BroV1Schema,
  BroV1VocabTurtle,
  CREATOR_TYPES,
  REACTION_TYPES,
  assertBroSchema,
  broV1Schema,
  cloneAndNormalizePayload,
  convertBroToBibframe,
  convertBroToKomarc,
  isBroGraph,
  isBroNode,
  isBroPayload,
  isReaction,
  isReactionAbstract,
  isReactionList,
  normalizePayload,
  normalizeUrnScheme,
  renderBroToMarkdown,
  validateBroSchema
});
