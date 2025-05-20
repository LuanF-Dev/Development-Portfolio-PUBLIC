/*
Development Portfolio (v1.0)

Copyright 2025 LuanF-Dev.
Written by Luan.F (20/05/2025).

This file is part of the Development Portfolio project ("Development-Portfolio").

This project is licensed under the "Attribution-NonCommercial-ShareAlike 4.0 International" license 
<https://creativecommons.org/licenses/by-nc-sa/4.0/deed.en>
*/

function initYouTubePostMessageAPI() { let e = document.getElementById("ytplayer"); e && e.contentWindow.postMessage(JSON.stringify({ event: "listening", id: e.id }), "*") } async function loadDetails() {
    let e = new URLSearchParams(window.location.search), a = parseInt(e.get("id")); try {
        let t = await fetch("../../../data.json"); if (!t.ok) throw Error("Erro ao carregar dados"); let o = await t.json(), s = o.find(e => e.id === a), r = document.getElementById("container"); if (!s) { r.innerText = "project n\xe3o encontrado."; return } let i = s.authors, l = ""; l = i.length > 1 ? `${i.slice(0, -1).join(" e ")}, ${i[i.length - 1]} ` : `${i} `; let n = "", c = !1; "Privado" === s.privacy && (c = !0), n = '<a class="btn btn-access" style="background-color:' + (c ? "#e50914" : "#218838") + `;" href="${s.projectURL}" target="_blank">` + `
        <i class="`+ (c ? "bi bi-lock-fill" : "bi bi-unlock-fill") + `"></i> Acessar project
         </a>`; let d = ""; if (s.updates.length > 0) for (let u = 0; u < s.updates.length; u++)d += `<li>${s.updates[u].updateDescription} - ` + dateFormat(s.updates[u].date) + ". </li>"; let p = ""; if (s.projectPhotos.length > 0) for (let v in s.projectPhotos) p += '<div class="carousel-item ' + (0 == v ? "" : " ") + `">
             <img class="custom-img" src="${s.projectPhotos[v]}" alt="Primeiro Slide">
             </div>`; r.innerHTML = `
        <div class="content">
            <img src="${s.banner}"
                alt="Imagem do project" class="banner" style="background-color: ${s.bannerBackgroundColor};" />
            <div class="title">${s.title}</div>
            <div>
            <div class="description">${s.description}</div>
            
            <div class="carousel-container">
                <div id="carouselExampleControls" class="carousel slide" data-ride="carousel">
        <div class="carousel-inner">`+ (s.ytVideID ? `<div class="carousel-item" >
                        <div class="youtube-player">
                            <iframe
                                id="ytplayer"
                                src="https://www.youtube.com/embed/${s.ytVideID}?enablejsapi=1"
                                title="YouTube video player"
                                frameborder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                allowfullscreen
                            ></iframe>
                        </div>
                    </div>`: "") + `
            ${p}
        
        </div>
        `+ (s.projectPhotos.length > 0 ? ` 
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
                    <a>Lan\xe7ado em: <strong>`+ (s.released ? dateFormat(s.released) : "Pendente") + `</strong></a>
                    <a>Atualizado em: <strong> `+ dateFormat(s.updated) + `</strong></a>
                    <a>Criado por: <strong>${l}</strong></a>
                    <a>Feito usando: <strong>`+ s.technology.join(", ") + `</strong></a>
                    <a>Uso: <strong>${s.privacy}</strong></a>
                    <a>Codigo fonte: <strong>${s.sourceCodePrivacy}</strong></a>
                </div>
            <!--  <button class="btn btn-save">Salvar</button> -->
            ${n}

        </div >
        </div >
    `} catch (g) { document.getElementById("container").innerText = "Erro ao carregar os dados.", console.error(g) } document.getElementsByClassName("carousel-item")[0].classList.add("active")
} $(".carousel").carousel({ interval: 3e3 }), window.addEventListener("message", function (e) { if (e.data && "string" == typeof e.data) try { let a = JSON.parse(e.data); if ("infoDelivery" === a.event && a.info && void 0 !== a.info.playerState) { let t = a.info.playerState, o = $(".carousel"); 1 === t ? o.carousel("dispose") : (2 === t || 0 === t) && o.carousel({ interval: 3e3, ride: "carousel" }) } } catch (s) { } }), window.addEventListener("load", () => { setTimeout(() => { let e = $(".carousel"); e.carousel("cycle"), initYouTubePostMessageAPI() }, 1e3) });
