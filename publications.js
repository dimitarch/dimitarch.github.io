Promise.all([
    fetch("publications.json").then((r) => r.json()),
    fetch("collaborators.json").then((r) => r.json()),
]).then(([pubs, collabs]) => render(pubs, collabs));

function render(pubs, collabs) {
    const container = document.getElementById("publications");
    container.innerHTML = pubs.map((p) => renderPub(p, collabs)).join("");
}

function renderPub(pub, collabs) {
    const authors = pub.authors
        .map((a) => {
        const url = a.url || collabs[a.name];
        let name = url ? `<a href="${url}">${a.name}</a>` : a.name;
        if (a.self) name = `<strong>${name}</strong>`;
        if (a.equal) name += "*";
        return name;
        })
        .join(", ");

    const venue = [
        pub.venue,
        pub.distinction ? `<em>${pub.distinction}</em>` : "",
    ]
        .filter(Boolean)
        .join(" &middot; ");

    const linkLabels = ["paper", "arxiv", "code", "slides", "poster"];
    const links = pub.links
        ? linkLabels
            .filter((k) => pub.links[k])
            .map((k) => `<a href="${pub.links[k]}">[${k}]</a>`)
            .join("   ")
        : "";

    const tags = pub.tags
        ? `<div class="pub-tags">${pub.tags.join(" &middot; ")}</div>`
        : "";

    return `
        <div class="pub">
        <div class="pub-title">${pub.title}</div>
        <div class="pub-authors">${authors}</div>
        <div class="pub-venue">${venue}</div>
        ${links ? `<div class="pub-links">${links}</div>` : ""}
        ${tags}
        </div>`;
}
