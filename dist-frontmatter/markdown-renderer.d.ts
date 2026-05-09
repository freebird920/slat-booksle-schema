declare const BRO_CONTEXT_IRI: "https://schema.slat.or.kr/bro/v1.0/context.jsonld";
type BroContext = typeof BRO_CONTEXT_IRI | readonly [typeof BRO_CONTEXT_IRI, ...Array<string | Record<string, unknown>>];
type EntityIri = `urn:uuid:${string}` | `https://${string}`;
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

declare function renderBroToMarkdown(payload: BibliographicReactionObjectBROV10): string;

export { renderBroToMarkdown };
