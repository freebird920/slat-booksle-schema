export const broV1VocabTurtle = `@prefix bro:    <https://schema.slat.or.kr/bro/v1.0/vocab#> .
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

export default broV1VocabTurtle;
