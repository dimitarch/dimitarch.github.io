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

const yaml = await Deno.readTextFile("publications.yaml");
const pubs = parse(yaml) as Publication[];

await Deno.writeTextFile("publications.json", JSON.stringify(pubs, null, 2));
console.log(`Built publications.json (${pubs.length} entries)`);
