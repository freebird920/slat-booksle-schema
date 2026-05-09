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

// src/lib/markdown-renderer.ts
var markdown_renderer_exports = {};
__export(markdown_renderer_exports, {
  renderBroToMarkdown: () => renderBroToMarkdown
});
module.exports = __toCommonJS(markdown_renderer_exports);
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  renderBroToMarkdown
});
