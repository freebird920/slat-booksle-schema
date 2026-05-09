var $schema = "https://json-schema.org/draft/2020-12/schema";
var $id = "https://schema.slat.or.kr/bro/v1.0/schema.json";
var title = "Bibliographic Reaction Object (BRO) v1.0";
var description = "BRO v1.0 exchange schema for bibliographic reaction data. Canonical BRO treats listing, recommendation, selection, award inclusion, review, comment, and unspecified response as Reaction signals. ReactionList groups Reaction or optional ReactionAbstract references. ReactionAbstract is an optional derived summary artifact, not a primary observed reaction. BRO is a lightweight JSON-LD application profile intended to connect fragmented human/institutional bibliographic reaction signals with existing bibliographic standards and commercial metadata systems; it does not replace MARC, MODS, BIBFRAME, ONIX, DataCite, Schema.org, Web Annotation, RLI, or national bibliographic datasets.";
var type = "object";
var oneOf = [
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
];
var $defs = {
	contextRef: {
		description: "MUST be the BRO v1.0 context IRI. If extension contexts are used, the BRO context MUST be first so that BRO terms are fixed before extension terms are introduced.",
		oneOf: [
			{
				"const": "https://schema.slat.or.kr/bro/v1.0/context.jsonld"
			},
			{
				type: "array",
				minItems: 1,
				prefixItems: [
					{
						"const": "https://schema.slat.or.kr/bro/v1.0/context.jsonld"
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
		pattern: "^https://(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?\\.)+[a-zA-Z]{2,}(?::[0-9]{1,5})?(?:/[^\\s<>\"\\\\^`{|}]*)?$",
		maxLength: 2048
	},
	httpOrHttpsIri: {
		type: "string",
		pattern: "^https?://[^\\s<>\"\\\\^`{|}]+$",
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
		maxLength: 2000
	},
	longText: {
		type: "string",
		minLength: 1,
		maxLength: 10000
	},
	bylineString: {
		type: "string",
		minLength: 1,
		maxLength: 2000,
		description: "Free-form attribution string as it appears in the source. Structured agent metadata belongs in creator."
	},
	sourceKey: {
		type: "string",
		minLength: 1,
		maxLength: 1000,
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
			maxLength: 2000
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
		maxLength: 300000,
		not: {
			pattern: "^(?:---|\\+\\+\\+)\\s*(?:\\r?\\n|$)"
		}
	},
	textFormat: {
		type: "string",
		description: "MIME type hint. Absent means text/plain.",
		pattern: "^[a-zA-Z0-9][a-zA-Z0-9!#$&^_.+-]{0,126}/[a-zA-Z0-9][a-zA-Z0-9!#$&^_.+-]{0,126}(?:\\s*;\\s*[a-zA-Z0-9!#$&^_.+-]+=(?:[a-zA-Z0-9!#$&^_.+-]+|\"[^\"]*\"))*$",
		maxLength: 255
	},
	reactionType: {
		type: "string",
		"enum": [
			"Response",
			"Listing",
			"Unspecified"
		],
		"default": "Unspecified",
		description: "Discriminator for the Reaction's primary information function, not for the prose style or length of text."
	},
	workType: {
		type: "string",
		pattern: "^[A-Z][A-Za-z0-9]*$",
		maxLength: 100,
		not: {
			"enum": [
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
				maxLength: 10000
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
							maxLength: 10000
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
				"const": "PropertyValue"
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
				maxLength: 10000
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
								maxLength: 10000
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
							maxLength: 10000
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
				maxLength: 2000,
				description: "Human-readable creator/author display string for unresolved or lightweight bibliographic references."
			},
			publisherName: {
				type: "string",
				minLength: 1,
				maxLength: 2000
			},
			bookEdition: {
				type: "string",
				minLength: 1,
				maxLength: 1000
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
				"enum": [
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
				"const": "ReactionList"
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
				"enum": [
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
				"const": "Person"
			},
			"@id": {
				$ref: "#/$defs/agentIri"
			},
			name: {
				type: "string",
				minLength: 1,
				maxLength: 1000
			},
			jobTitle: {
				type: "string",
				minLength: 1,
				maxLength: 1000
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
					maxLength: 1000
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
				"const": "UnknownAgent"
			},
			name: {
				type: "string",
				minLength: 1,
				maxLength: 1000
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
				"enum": [
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
				maxLength: 1000
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
					maxLength: 1000
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
				"const": "SoftwareApplication"
			},
			"@id": {
				$ref: "#/$defs/httpsIri"
			},
			name: {
				type: "string",
				minLength: 1,
				maxLength: 1000
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
				"const": "Role"
			},
			roleName: {
				type: "string",
				minLength: 1,
				maxLength: 1000
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
					maxLength: 1000
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
				"const": "Reaction"
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
				"if": {
					properties: {
						reactionType: {
							"const": "Response"
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
				"const": "ReactionAbstract"
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
				"const": "ReactionList"
			},
			itemListElement: {
				type: "array",
				minItems: 0,
				maxItems: 10000,
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
					maxLength: 2000
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
				"const": "Reaction"
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
				"if": {
					properties: {
						reactionType: {
							"const": "Response"
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
				"const": "ReactionAbstract"
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
				"const": "ReactionList"
			},
			itemListElement: {
				type: "array",
				minItems: 0,
				maxItems: 10000,
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
					maxLength: 2000
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
				maxItems: 20000,
				items: {
					$ref: "#/$defs/graphNode"
				}
			}
		},
		additionalProperties: false
	}
};
var broV1Schema = {
	$schema: $schema,
	$id: $id,
	title: title,
	description: description,
	type: type,
	oneOf: oneOf,
	$defs: $defs
};

declare const broV1Context: {
    readonly "@context": {
        readonly "@version": 1.1;
        readonly "@protected": true;
        readonly "@base": "https://schema.slat.or.kr/bro/v1.0/instances/";
        readonly schema: "https://schema.org/";
        readonly bro: "https://schema.slat.or.kr/bro/v1.0/vocab#";
        readonly xsd: "http://www.w3.org/2001/XMLSchema#";
        readonly rdfs: "http://www.w3.org/2000/01/rdf-schema#";
        readonly prov: "http://www.w3.org/ns/prov#";
        readonly dc: "http://purl.org/dc/elements/1.1/";
        readonly dcterms: "http://purl.org/dc/terms/";
        readonly bibo: "http://purl.org/ontology/bibo/";
        readonly bf: "http://id.loc.gov/ontologies/bibframe/";
        readonly nlon: "http://lod.nl.go.kr/ontology/";
        readonly Reaction: "bro:Reaction";
        readonly ReactionAbstract: "bro:ReactionAbstract";
        readonly ReactionList: "bro:ReactionList";
        readonly UnknownAgent: "bro:UnknownAgent";
        readonly Person: "schema:Person";
        readonly Organization: "schema:Organization";
        readonly Library: "schema:Library";
        readonly GovernmentOrganization: "schema:GovernmentOrganization";
        readonly EducationalOrganization: "schema:EducationalOrganization";
        readonly School: "schema:School";
        readonly Corporation: "schema:Corporation";
        readonly SoftwareApplication: "schema:SoftwareApplication";
        readonly Role: "schema:Role";
        readonly PropertyValue: "schema:PropertyValue";
        readonly CreativeWork: "schema:CreativeWork";
        readonly Book: "schema:Book";
        readonly Article: "schema:Article";
        readonly ScholarlyArticle: "schema:ScholarlyArticle";
        readonly WebPage: "schema:WebPage";
        readonly Dataset: "schema:Dataset";
        readonly Chapter: "schema:Chapter";
        readonly Report: "schema:Report";
        readonly Review: "schema:Review";
        readonly Recommendation: "schema:Recommendation";
        readonly Response: "bro:Response";
        readonly Listing: "bro:Listing";
        readonly Unspecified: "bro:Unspecified";
        readonly reactionType: {
            readonly "@id": "bro:reactionType";
            readonly "@type": "@vocab";
        };
        readonly name: "schema:name";
        readonly description: "schema:description";
        readonly byline: "bro:byline";
        readonly text: "schema:text";
        readonly textFormat: "schema:encodingFormat";
        readonly creator: {
            readonly "@id": "schema:creator";
            readonly "@container": "@set";
        };
        readonly agent: "schema:agent";
        readonly roleName: "schema:roleName";
        readonly jobTitle: "schema:jobTitle";
        readonly affiliation: {
            readonly "@id": "schema:affiliation";
            readonly "@container": "@set";
        };
        readonly knowsAbout: {
            readonly "@id": "schema:knowsAbout";
            readonly "@container": "@set";
        };
        readonly credential: {
            readonly "@id": "bro:credential";
            readonly "@container": "@set";
        };
        readonly softwareVersion: "schema:softwareVersion";
        readonly about: {
            readonly "@id": "schema:about";
            readonly "@container": "@set";
        };
        readonly isPartOf: {
            readonly "@id": "schema:isPartOf";
            readonly "@container": "@set";
        };
        readonly isBasedOn: {
            readonly "@id": "schema:isBasedOn";
            readonly "@container": "@set";
        };
        readonly itemListElement: {
            readonly "@id": "schema:itemListElement";
            readonly "@container": "@list";
        };
        readonly selectionCriteria: {
            readonly "@id": "bro:selectionCriteria";
            readonly "@container": "@set";
        };
        readonly source: {
            readonly "@id": "prov:wasDerivedFrom";
            readonly "@container": "@set";
        };
        readonly sourceKey: "bro:sourceKey";
        readonly identifier: {
            readonly "@id": "schema:identifier";
            readonly "@container": "@set";
        };
        readonly creatorName: "bro:creatorName";
        readonly publisherName: "bro:publisherName";
        readonly bookEdition: "schema:bookEdition";
        readonly datePublished: {
            readonly "@id": "schema:datePublished";
            readonly "@type": "xsd:dateTime";
        };
        readonly dateCreated: {
            readonly "@id": "schema:dateCreated";
            readonly "@type": "xsd:dateTime";
        };
        readonly dateModified: {
            readonly "@id": "schema:dateModified";
            readonly "@type": "xsd:dateTime";
        };
        readonly startDate: {
            readonly "@id": "schema:startDate";
            readonly "@type": "xsd:date";
        };
        readonly endDate: {
            readonly "@id": "schema:endDate";
            readonly "@type": "xsd:date";
        };
        readonly license: {
            readonly "@id": "schema:license";
            readonly "@type": "@id";
        };
        readonly url: {
            readonly "@id": "schema:url";
            readonly "@type": "@id";
        };
        readonly image: {
            readonly "@id": "schema:image";
            readonly "@type": "@id";
            readonly "@container": "@set";
        };
        readonly citation: {
            readonly "@id": "schema:citation";
            readonly "@type": "@id";
            readonly "@container": "@set";
        };
        readonly inLanguage: {
            readonly "@id": "schema:inLanguage";
            readonly "@container": "@set";
        };
        readonly audience: {
            readonly "@id": "schema:audience";
            readonly "@container": "@set";
        };
        readonly genre: {
            readonly "@id": "schema:genre";
            readonly "@container": "@set";
        };
        readonly keywords: {
            readonly "@id": "schema:keywords";
            readonly "@container": "@set";
        };
        readonly additionalProperty: {
            readonly "@id": "schema:additionalProperty";
            readonly "@container": "@set";
        };
        readonly value: "schema:value";
        readonly valueReference: "schema:valueReference";
        readonly propertyID: "schema:propertyID";
        readonly unitCode: "schema:unitCode";
        readonly unitText: "schema:unitText";
    };
};

declare const broV1VocabTurtle = "@prefix bro:    <https://schema.slat.or.kr/bro/v1.0/vocab#> .\n@prefix schema: <https://schema.org/> .\n@prefix rdfs:   <http://www.w3.org/2000/01/rdf-schema#> .\n@prefix rdf:    <http://www.w3.org/1999/02/22-rdf-syntax-ns#> .\n@prefix prov:   <http://www.w3.org/ns/prov#> .\n\nbro:Reaction a rdfs:Class ;\n  rdfs:subClassOf schema:CreativeWork ;\n  rdfs:comment \"A bibliographic reaction signal: listing, recommendation, selection, review, comment, or unspecified response concerning one or more external works.\"@en .\n\nbro:ReactionAbstract a rdfs:Class ;\n  rdfs:subClassOf schema:CreativeWork ;\n  rdfs:comment \"An optional derived summary artifact, not a primary observed reaction. Use when a summary derived from a Reaction, ReactionList, another ReactionAbstract, or external bibliographic resource must be exchanged with its own provenance.\"@en .\n\nbro:ReactionList a rdfs:Class ;\n  rdfs:subClassOf schema:ItemList ;\n  rdfs:comment \"A curation container that aggregates Reaction and/or ReactionAbstract entities by reference.\"@en .\n\nbro:UnknownAgent a rdfs:Class ;\n  rdfs:subClassOf schema:Agent ;\n  rdfs:comment \"Explicit declaration that the publisher cannot identify the responsible agent. Each instance is a fresh blank node by design.\"@en .\n\nbro:ReactionType a rdfs:Class .\n\nbro:reactionType a rdf:Property ;\n  rdfs:subPropertyOf schema:additionalType ;\n  rdfs:comment \"Primary information function of a Reaction: Response, Listing, or Unspecified.\"@en .\n\nbro:Response a bro:ReactionType ;\n  rdfs:comment \"A Reaction whose primary function is an independent review, comment, critique, assessment, or response body.\"@en .\n\nbro:Listing a bro:ReactionType ;\n  rdfs:comment \"A Reaction whose primary function is to record that a resource was listed, selected, recommended, awarded, shortlisted, or otherwise included in a curation context. Text may be empty or contain a rationale.\"@en .\n\nbro:Unspecified a bro:ReactionType ;\n  rdfs:comment \"A Reaction whose source does not allow the publisher to classify the primary function safely.\"@en .\n\nbro:byline a rdf:Property ;\n  rdfs:subPropertyOf schema:creditText ;\n  rdfs:comment \"Free-form attribution string preserved from the source.\"@en .\n\nbro:sourceKey a rdf:Property ;\n  rdfs:subPropertyOf schema:identifier ;\n  rdfs:comment \"Source-local key for idempotent re-ingestion. Not a global bibliographic identifier.\"@en .\n\nbro:selectionCriteria a rdf:Property ;\n  rdfs:subPropertyOf schema:description ;\n  rdfs:comment \"Human-readable criterion used by a list or selection program.\"@en .\n\nbro:credential a rdf:Property ;\n  rdfs:comment \"Plain-text credential or authority clue asserted by the publisher or preserved from source. It is evidence, not proof.\"@en .\n\nbro:creatorName a rdf:Property ;\n  rdfs:subPropertyOf schema:creator ;\n  rdfs:comment \"Human-readable creator or author display string for lightweight or unresolved bibliographic references.\"@en .\n\nbro:publisherName a rdf:Property ;\n  rdfs:subPropertyOf schema:publisher ;\n  rdfs:comment \"Human-readable publisher display string for lightweight bibliographic references.\"@en .\n";

declare function normalizeUrnScheme(value: string): string;
declare function normalizePayload<T>(payload: T): T;
declare function cloneAndNormalizePayload<T>(payload: T): T;

declare const BRO_CONTEXT_IRI$1: "https://schema.slat.or.kr/bro/v1.0/context.jsonld";
type BroContext = typeof BRO_CONTEXT_IRI$1 | readonly [typeof BRO_CONTEXT_IRI$1, ...Array<string | Record<string, unknown>>];
type EntityIri = `urn:uuid:${string}` | `https://${string}`;
type WebIri = `http://${string}` | `https://${string}`;
type HttpsIri = `https://${string}`;
type AgentIri = EntityIri | `mailto:${string}`;
type Rfc3339DateTime = string;
type Rfc3339Date = string;
type BibliographicDate = Rfc3339DateTime | Rfc3339Date | string;
type LanguageTag = string;
type TextFormat = string;
type BoundedJsonValue = string | number | boolean | null | readonly unknown[] | Record<string, unknown>;
type ReactionType = "Response" | "Listing" | "Unspecified";
type BroEntityType = "Reaction" | "ReactionAbstract" | "ReactionList";
type WorkType = "CreativeWork" | "Book" | "Article" | "ScholarlyArticle" | "WebPage" | "Report" | "Dataset" | "Chapter" | "Periodical" | "PublicationIssue" | "PublicationVolume" | (string & {});
interface PropertyValue {
    readonly "@type": "PropertyValue";
    name: string;
    propertyID?: string;
    value: BoundedJsonValue;
    valueReference?: string;
    unitCode?: string;
    unitText?: string;
}
type IdentifierPropertyValue = PropertyValue;
type IdentifierValue = string | PropertyValue;
type IdentifierSet = IdentifierValue | readonly [IdentifierValue, ...IdentifierValue[]];
type AdditionalPropertyArray = PropertyValue[];
interface WorkReference {
    readonly "@type": WorkType;
    readonly "@id"?: string;
    identifier?: IdentifierSet;
    name?: string;
    creatorName?: string;
    publisherName?: string;
    bookEdition?: string;
    datePublished?: BibliographicDate;
    url?: string;
    inLanguage?: readonly [LanguageTag, ...LanguageTag[]];
    keywords?: string[];
    additionalProperty?: AdditionalPropertyArray;
    [extensionKey: `${Lowercase<string>}:${string}`]: unknown;
}
interface BroEntityReference<T extends BroEntityType = BroEntityType> {
    readonly "@id": EntityIri;
    readonly "@type": T;
}
type ReactionOrAbstractReference = BroEntityReference<"Reaction" | "ReactionAbstract">;
type ReactionListReference = BroEntityReference<"ReactionList">;
type BasedOnReference = WorkReference | BroEntityReference;
type TargetReference = WorkReference;
type ListElement = ReactionOrAbstractReference;
type OrganizationType = "Organization" | "Library" | "GovernmentOrganization" | "EducationalOrganization" | "School" | "Corporation";
interface AgentOrganization {
    readonly "@type": OrganizationType;
    readonly "@id"?: EntityIri;
    name: string;
    knowsAbout?: string[];
    credential?: string[];
    additionalProperty?: AdditionalPropertyArray;
}
interface AgentPerson {
    readonly "@type": "Person";
    readonly "@id"?: AgentIri;
    name: string;
    jobTitle?: string;
    affiliation?: AgentOrganization[];
    knowsAbout?: string[];
    credential?: string[];
    additionalProperty?: AdditionalPropertyArray;
}
interface AgentUnknown {
    readonly "@type": "UnknownAgent";
    name?: string;
}
interface AgentSoftware {
    readonly "@type": "SoftwareApplication";
    readonly "@id": HttpsIri;
    name: string;
    softwareVersion?: string;
    additionalProperty?: AdditionalPropertyArray;
}
type AgentInRole = AgentPerson | AgentUnknown | AgentOrganization | AgentSoftware;
interface AgentRole {
    readonly "@type": "Role";
    roleName?: string;
    startDate?: Rfc3339Date;
    endDate?: Rfc3339Date;
    agent: AgentInRole;
    affiliation?: AgentOrganization[];
    knowsAbout?: string[];
    credential?: string[];
    additionalProperty?: AdditionalPropertyArray;
}
type Agent = AgentInRole | AgentRole;
type CreatorRoot = Agent;
interface BroBase {
    readonly "@context": BroContext;
    readonly "@id": EntityIri;
    name?: string;
    description?: string;
    byline?: string;
    creator: [Agent, ...Agent[]];
    dateCreated: Rfc3339DateTime;
    dateModified?: Rfc3339DateTime;
    datePublished?: Rfc3339DateTime;
    license?: HttpsIri;
    source?: WorkReference[];
    sourceKey?: string;
    inLanguage?: [LanguageTag, ...LanguageTag[]];
    audience?: string[];
    genre?: string[];
    keywords?: string[];
    image?: string[];
    citation?: string[];
    additionalProperty?: AdditionalPropertyArray;
    [extensionKey: `${Lowercase<string>}:${string}`]: unknown;
}
interface Reaction extends BroBase {
    readonly "@type": "Reaction";
    reactionType: ReactionType;
    about: [WorkReference, ...WorkReference[]];
    isPartOf?: [ReactionListReference, ...ReactionListReference[]];
    text: string;
    textFormat?: TextFormat;
}
interface ReactionAbstract extends BroBase {
    readonly "@type": "ReactionAbstract";
    text: string;
    textFormat?: TextFormat;
    isBasedOn: [BasedOnReference, ...BasedOnReference[]];
}
interface ReactionList extends BroBase {
    readonly "@type": "ReactionList";
    itemListElement: ListElement[];
    selectionCriteria?: string[];
}
type BroNode = Reaction | ReactionAbstract | ReactionList;
interface BROGraph {
    readonly "@context": BroContext;
    readonly "@id"?: EntityIri;
    readonly "@graph": [BroNode, ...BroNode[]];
}
type BroDocument = BroNode | BROGraph;
type BibliographicReactionObjectBROV10 = BroDocument;
type BibliographicReactionObjectBRO = BibliographicReactionObjectBROV10;
type BroPayload = BroDocument;
type BroReaction = Reaction;
type BroReactionAbstract = ReactionAbstract;
type BroReactionList = ReactionList;
/**
 * Compatibility aliases for earlier public API names.
 * New code should use Reaction, ReactionAbstract, ReactionList, BroNode, and BROGraph.
 */
type ExternalReference = WorkReference;
type ElementReference = ReactionOrAbstractReference;
type BroReference = BroEntityReference<"Reaction" | "ReactionAbstract">;
type ListEntityReference = ReactionOrAbstractReference;
type BasedOnEntityReference = BroEntityReference;
type WorkIdentityReference = WorkReference;
type BibliographicLevel = never;
type AgentGovernment = AgentOrganization;
type AgentCorporation = AgentOrganization;
type BroArticle = Reaction;
type BroAbstract = ReactionAbstract;
type BroItemList = ReactionList;
interface BroValidationError {
    location: string;
    keyword?: string;
    message: string;
    error?: string;
    instanceLocation?: string;
}
interface BroValidationResult<T = unknown> {
    valid: boolean;
    errors: BroValidationError[];
    normalizedPayload?: T;
}

declare const BRO_CONTEXT_IRI: "https://schema.slat.or.kr/bro/v1.0/context.jsonld";
declare const BRO_SCHEMA_IRI: "https://schema.slat.or.kr/bro/v1.0/schema.json";
declare const BRO_VOCAB_IRI: "https://schema.slat.or.kr/bro/v1.0/vocab#";
declare const BRO_ENTITY_TYPES: readonly ["Reaction", "ReactionAbstract", "ReactionList"];
declare const REACTION_TYPES: readonly ["Response", "Listing", "Unspecified"];
declare const AGENT_TYPES: readonly ["Person", "UnknownAgent", "Organization", "Library", "GovernmentOrganization", "EducationalOrganization", "School", "Corporation", "SoftwareApplication", "Role"];
type AgentType = (typeof AGENT_TYPES)[number];
type CreatorType = AgentType;
type Creator = Agent;
type CreatorPerson = AgentPerson;
type CreatorUnknown = AgentUnknown;
type CreatorAnonymous = AgentUnknown;
type CreatorGovernment = AgentGovernment;
type CreatorCorporation = AgentCorporation;
type CreatorOrganization = AgentOrganization;
type CreatorSoftware = AgentSoftware;
type CreatorRole = AgentRole;
declare function isBroNode(value: unknown): value is BroNode;
declare function isBroGraph(value: unknown): value is Extract<BroDocument, {
    "@graph": unknown;
}>;
declare function isBroPayload(value: unknown): value is BroPayload;
declare function isReaction(value: unknown): value is BroReaction;
declare function isReactionAbstract(value: unknown): value is BroReactionAbstract;
declare function isReactionList(value: unknown): value is BroReactionList;

interface ValidateBroOptions {
    normalize?: boolean;
    mutate?: boolean;
    includeNormalizedPayload?: boolean;
}
declare function validateBroSchema<T = BibliographicReactionObjectBROV10>(data: unknown, options?: ValidateBroOptions): BroValidationResult<T>;
declare function assertBroSchema(data: unknown, options?: ValidateBroOptions): asserts data is BibliographicReactionObjectBROV10;

interface BibframeContribution {
    "@type": "bf:Contribution";
    "bf:agent": {
        "@type": string;
        "@id"?: string;
        "rdfs:label": string;
    };
    "bf:role"?: {
        "@type": "bf:Role";
        "rdfs:label": string;
    };
}
interface BibframeIdentifier {
    "@type": "bf:Identifier";
    "rdf:value": string;
}
interface BibframeInstance {
    "@type": "bf:Instance";
    "bf:identifiedBy"?: BibframeIdentifier | BibframeIdentifier[];
    "bf:instanceOf"?: {
        "@id": string;
        "@type": string;
    };
    "rdfs:label"?: string;
}
interface BibframeNote {
    "@type": "bf:Note";
    "rdfs:label": string;
}
interface BibframeWork {
    "@context": {
        bf: string;
        rdf: string;
        rdfs: string;
        schema: string;
        bro: string;
    };
    "@type": string[];
    "@id": string;
    "bf:originDate": string;
    "bf:changeDate"?: string;
    "bf:contribution": BibframeContribution[];
    "bf:title"?: {
        "@type": "bf:Title";
        "bf:mainTitle": string;
    };
    "bf:note"?: BibframeNote;
    [key: string]: unknown;
}
declare function convertBroToBibframe(payload: BibliographicReactionObjectBROV10): BibframeWork | BibframeWork[];

declare function renderBroToMarkdown(payload: BibliographicReactionObjectBROV10): string;

interface KomarcSubfield {
    code: string;
    value: string;
}
interface KomarcDataField {
    tag: string;
    indicator1: string;
    indicator2: string;
    subfields: KomarcSubfield[];
}
interface KomarcControlField {
    tag: string;
    value: string;
}
interface KomarcRecord {
    controlFields: KomarcControlField[];
    dataFields: KomarcDataField[];
}
declare function convertBroToKomarc(payload: BibliographicReactionObjectBROV10): KomarcRecord | KomarcRecord[];

export { AGENT_TYPES, type AdditionalPropertyArray, type Agent, type AgentCorporation, type AgentGovernment, type AgentInRole, type AgentIri, type AgentOrganization, type AgentPerson, type AgentRole, type AgentSoftware, type AgentType, type AgentUnknown, type BROGraph, BRO_CONTEXT_IRI, BRO_ENTITY_TYPES, BRO_SCHEMA_IRI, BRO_VOCAB_IRI, type BasedOnEntityReference, type BasedOnReference, type BibframeContribution, type BibframeIdentifier, type BibframeInstance, type BibframeNote, type BibframeWork, type BibliographicDate, type BibliographicLevel, type BibliographicReactionObjectBRO, type BibliographicReactionObjectBROV10, type BoundedJsonValue, type BroAbstract, type BroArticle, type BroBase, type BroContext, type BroDocument, type BroEntityReference, type BroEntityType, type BroItemList, type BroNode, type BroPayload, type BroReaction, type BroReactionAbstract, type BroReactionList, type BroReference, broV1Context as BroV1Context, broV1Schema as BroV1Schema, broV1VocabTurtle as BroV1VocabTurtle, type BroValidationError, type BroValidationResult, AGENT_TYPES as CREATOR_TYPES, type Creator, type CreatorAnonymous, type CreatorCorporation, type CreatorGovernment, type CreatorOrganization, type CreatorPerson, type CreatorRole, type CreatorRoot, type CreatorSoftware, type CreatorType, type CreatorUnknown, type ElementReference, type EntityIri, type ExternalReference, type HttpsIri, type IdentifierPropertyValue, type IdentifierSet, type IdentifierValue, type KomarcControlField, type KomarcDataField, type KomarcRecord, type KomarcSubfield, type LanguageTag, type ListElement, type ListEntityReference, type OrganizationType, type PropertyValue, REACTION_TYPES, type Reaction, type ReactionAbstract, type ReactionList, type ReactionListReference, type ReactionOrAbstractReference, type ReactionType, type Rfc3339Date, type Rfc3339DateTime, type TargetReference, type TextFormat, type WebIri, type WorkIdentityReference, type WorkReference, type WorkType, assertBroSchema, broV1Schema, cloneAndNormalizePayload, convertBroToBibframe, convertBroToKomarc, isBroGraph, isBroNode, isBroPayload, isReaction, isReactionAbstract, isReactionList, normalizePayload, normalizeUrnScheme, renderBroToMarkdown, validateBroSchema };
