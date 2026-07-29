import { parse } from "jsr:@std/yaml";

interface Author {
    name: string;
    url?: string;
    self?: boolean;
    equal?: boolean;
}

interface Publication {
    title: string;
    url: string;
    venue: string;
    distinction?: string;
    authors: Author[];
    links?: {
        paper?: string;
        arxiv?: string;
        code?: string;
        slides?: string;
        poster?: string;
    };
}

const pubsYaml = await Deno.readTextFile("publications.yaml");
const pubs = parse(pubsYaml) as Publication[];
await Deno.writeTextFile("publications.json", JSON.stringify(pubs, null, 4));
console.log(`Built publications.json (${pubs.length} entries)`);

const collabYaml = await Deno.readTextFile("collaborators.yaml");
const collabs = parse(collabYaml) as Record<string, string>;
await Deno.writeTextFile("collaborators.json", JSON.stringify(collabs, null, 4));
console.log(`Built collaborators.json (${Object.keys(collabs).length} entries)`);
