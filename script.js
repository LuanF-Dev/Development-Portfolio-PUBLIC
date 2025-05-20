/*
Development Portfolio (v1.0)

Copyright 2025 LuanF-Dev.
Written by Luan.F (20/05/2025).

This file is part of the Development Portfolio project ("Development-Portfolio").

This project is licensed under the "Attribution-NonCommercial-ShareAlike 4.0 International" license 
<https://creativecommons.org/licenses/by-nc-sa/4.0/deed.en>
*/

function dateFormat(e) { return new Date(1e3 * e).toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit", year: "numeric" }) } function loadHome() { window.addEventListener("DOMContentLoaded", async () => { let e = document.querySelectorAll(".project_cards"); for (let t of e) { let a = t.getAttribute("filter"), o = await getProjects(a); t.appendChild(o) } let r = document.querySelectorAll(".carousel-inner"); for (let l of (console.log("todasDi: ", r), r)) { let s = l.getAttribute("highlight"), n = await getHighlights(s); l.appendChild(n) } $(document).ready(function () { $("#heroCarousel").on("slide.bs.carousel", function () { let e = document.querySelector("#heroCarousel .carousel-item.active"), t = e.querySelector(".toggle-description"), a = e.querySelector(".short"); a && "none" === a.style.display && t && t.click() }) }); let i = document.getElementById("loading-screen"); i.style.display = "none" }), document.addEventListener("DOMContentLoaded", () => { let e = document.querySelector(".technology-scroll-wrapper"), t = e.querySelector(".container-technology-list"), a = e.querySelector(".arrow-tech.left"), o = e.querySelector(".arrow-tech.right"); function r() { let e = t.scrollLeft > 5, r = t.scrollLeft + t.clientWidth < t.scrollWidth - 5; a.style.display = e ? "flex" : "none", o.style.display = r ? "flex" : "none" } a.addEventListener("click", () => { t.scrollBy({ left: -120, behavior: "smooth" }) }), o.addEventListener("click", () => { t.scrollBy({ left: 120, behavior: "smooth" }) }), t.addEventListener("scroll", r), window.addEventListener("resize", r), r() }), document.querySelectorAll(".card-wrapper").forEach(e => { let t = e.querySelector(".project_cards"), a = e.querySelector(".arrow.left"), o = e.querySelector(".arrow.right"), r, l; function s() { r = t.scrollLeft, l = t.scrollWidth - t.offsetWidth; let e = r < l - 5, s = r >= 6; o.style.display = e ? "flex" : "none", a.style.display = s ? "flex" : "none" } o.onclick = () => { t.scrollBy({ left: 240, behavior: "smooth" }) }, a.onclick = () => { t.scrollBy({ left: -240, behavior: "smooth" }), console.log("scrollLeft: ", parseInt(r)) }, t.addEventListener("scroll", s), window.addEventListener("load", () => { s(), setTimeout(s, 500) }), window.addEventListener("resize", s) }) } function createCard(e) {
    let t = document.createElement("a"); t.className = "card", t.target = "_blank"; let a = e.description.trim().split(/\s+/), o = a.length > 10 ? a.slice(0, 10).join(" ") + "<span class='limitation-description'> ...</span> " : e.description, r = e.technology.length > 2 ? `${e.technology.slice(0, 2).join(", ")} ...` : e.technology.join(", "); return t.innerHTML = `
        <img class="card-image"style='background-color: ${e.bannerBackgroundColor}' src="${e.thumbnail}" alt="Capa do project">
        <div class="card-content">
            <h3 class="card-title">${e.title}</h3>
            <p class="card-description">${o}</p>
            `+ (e.updated ? `<p class="card-updated">Atualizado em <span class="highlights">${dateFormat(e.updated)}</span></p>` : "") + `
        <p class="card-technology"><span class="highlights">${r}</span></p>
        </div>
    `, t.addEventListener("click", () => { window.location.href = `pages/Details/details.html?id=${e.id}` }), t
} function createBanner(e, t) {
    let a = e.description.trim().split(/\s+/), o = a.length > 30, r = a.slice(0, 30).join(" "), l = e.description, s = document.createElement("div"); if (s.classList.add("carousel-item"), 0 == e.id && s.classList.add("active"), s.innerHTML = `
        <div class="banner">
            <div class="banner-content">
                <h1 class="banner-title">${e.title}</h1>
                <p class="banner-ranking">#${t} Em alta</p>
                <p class="banner-description">
                    <span class="short">${r}</span>
                    <span class="full" style="display:none;">${l}</span>
                    ${o ? '<span class="toggle-description">Mostrar mais...</span>' : ""}
                </p>
                 
                <button class="watch-button" onClick="window.location.href='pages/Details/details.html?id=${e.id}';">
                    <i class="fas fa-play"></i> Ver detalhes
                </button>
            </div>
            <div class="banner-thumbnail">
                <img src="${e.banner}" style="background-color: ${e.bannerBackgroundColor}" alt="Banner ${e.id}">
            </div>
        </div>
    `, o) { let n = s.querySelector(".banner"), i = s.querySelector(".banner-description"), c = s.querySelector(".toggle-description"), d = s.querySelector(".short"), p = s.querySelector(".full"); console.log("max-height: ", n), c.addEventListener("click", () => { let e = "inline" === p.style.display; n.style.maxHeight = e ? "500px" : "none", i.style.overflow = e ? "hidden" : "auto", p.style.display = e ? "none" : "inline", d.style.display = e ? "inline" : "none", c.textContent = e ? "Mostrar mais..." : "Mostrar menos", e && (i.scrollTop = 0) }) } return s
} async function getProjects(e) { let t = document.createDocumentFragment(), a = await fetch("data.json"), o = await a.json(); return o.forEach(a => { let o = "All" === e || a.newness && "newness" === e || a.technology?.some(t => t.includes(e)); if (o) { let r = createCard(a); t.appendChild(r) } }), t } async function getHighlights(e) { let t = document.createDocumentFragment(), a = await fetch("data.json"), o = await a.json(), r = 1; return o.forEach(e => { let a = e.highlight; if (a) { let o = createBanner(e, r); t.appendChild(o), r++ } }), console.log("container: ", t), t } async function loadDetails() {
    let e = new URLSearchParams(window.location.search), t = parseInt(e.get("id")); try {
        let a = await fetch("data.json"); if (!a.ok) throw Error("Erro ao carregar dados"); let o = await a.json(), r = o.find(e => e.id === t), l = document.getElementById("container"); if (!r) { l.innerText = "project n\xe3o encontrado."; return } let s = r.authors, n = ""; n = s.length > 1 ? `${s.slice(0, -1).join(" e ")}, ${s[s.length - 1]} ` : `${s} `; let i = "", c = !1; "Privado" === r.privacy && (c = !0), i = '<a class="btn btn-access" style="background-color:' + (c ? "#e50914" : "#218838") + `;" href="${r.projectURL}" target="_blank">` + `
        <i class="`+ (c ? "bi bi-lock-fill" : "bi bi-unlock-fill") + `"></i> Acessar project
         </a>`; let d = ""; if (r.updates.length > 0) for (let p = 0; p < r.updates.length; p++)d += `<li>${r.updates[p].updateDescription} - ` + dateFormat(r.updates[p].date) + ". </li>"; let u = ""; if (r.projectPhotos.length > 0) for (let g in r.projectPhotos) u += '<div class="carousel-item ' + (0 == g ? "" : " ") + `">
             <img class="custom-img" src="${r.projectPhotos[g]}" alt="Primeiro Slide">
             </div>`; l.innerHTML = `
        <div class="content">
            <img src="${r.banner}"
                alt="Imagem do project" class="banner" style="background-color: ${r.bannerBackgroundColor};" />
            <div class="title">${r.title}</div>
            <div>
            <div class="description">${r.description}</div>
            
            <div class="carousel-container">
                <div id="carouselExampleControls" class="carousel slide" data-ride="carousel">
        <div class="carousel-inner">`+ (r.ytVideID ? `<div class="carousel-item" >
                        <div class="youtube-player">
                            <iframe
                                id="ytplayer"
                                src="https://www.youtube.com/embed/${r.ytVideID}?enablejsapi=1"
                                title="YouTube video player"
                                frameborder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                allowfullscreen
                            ></iframe>
                        </div>
                    </div>`: "") + `
            ${u}
        
        </div>
        `+ (r.projectPhotos.length > 0 ? ` 
        <a class="carousel-control-prev outside-arrow" href="#carouselExampleControls" role="button" data-slide="prev">
        <span class="carousel-control-prev-icon custom-arrow" aria-hidden="true"></span>
        <span class="sr-only">Anterior</span>
        </a>
        <a class="carousel-control-next outside-arrow" href="#carouselExampleControls" role="button" data-slide="next">
        <span class="carousel-control-next-icon custom-arrow" aria-hidden="true"></span>
        <span class="sr-only">Pr\xf3ximo</span>
        </a>`: "") + `
        </div>
        </div>
            <div class="information-container">
                <div class="information">
                    `+ (d ? `<div class="title-update-description">Nota de atualiza\xe7\xe3o: </div><ul class="description">
                    ${d}
                    </ul>`: "") + `
                    <a>Lan\xe7ado em: <strong>`+ (r.released ? dateFormat(r.released) : "Pendente") + `</strong></a>
                    <a>Atualizado em: <strong> `+ dateFormat(r.updated) + `</strong></a>
                    <a>Criado por: <strong>${n}</strong></a>
                    <a>Feito usando: <strong>`+ r.technology.join(", ") + `</strong></a>
                    <a>Uso: <strong>${r.privacy}</strong></a>
                    <a>Codigo fonte: <strong>${r.sourceCodePrivacy}</strong></a>
                </div>
            <!--  <button class="btn btn-save">Salvar</button> -->
            ${i}

        </div >
        </div >
    `} catch (h) { document.getElementById("container").innerText = "Erro ao carregar os dados.", console.error(h) } document.getElementsByClassName("carousel-item")[0].classList.add("active")
}
//
