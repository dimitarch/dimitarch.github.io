fetch("publications.json")
    .then((r) => r.json())
    .then(render);

function render(pubs) {
    const container = document.getElementById("publications");
    container.innerHTML = pubs.map(renderPub).join("");
}

function renderPub(pub) {
    const authors = pub.authors
        .map((a) => {
        let name = a.url ? `<a href="${a.url}">${a.name}</a>` : a.name;
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
