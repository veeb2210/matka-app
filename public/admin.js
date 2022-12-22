
let matkad = [];

async function loeMatkad() {
    let response = await fetch('/api/matkad');

    if (response.status === 200) {
        let data = await response.json();
        matkad = data
        valjastaMatkad(data)
    }
}

function valjastaMatkad(matkad) {
    const matkadEl = document.getElementById('valjund_matkad')
    matkadEl.innerHTML = ""
    for (let i = 0; i < matkad.length; i++) {
        matkadEl.innerHTML += `
        <div class="matkaElement" onclick="valjastaOsalejad(${i+1})">
           => ${matkad[i].nimetus} - ${matkad[i].kuupaev}
        </div>
        `
    }
}

async function valjastaOsalejad(index) {
    console.log(index)
    let response = await fetch('/api/matkadel_osalejad/' + index);

    if (response.status === 200) {
        let data = await response.json();
        naitaMatkaOsalejaid(data, index)
    }
}

function naitaMatkaOsalejaid(osalejad, index) {
    console.log(osalejad)
    const osalejadEl = document.getElementById('valjund_osalejad')
    osalejadEl.innerHTML = ""
    osalejadEl.innerHTML += `
    <h2>${matkad[index-1].nimetus}</h2>
    <p>${matkad[index-1].kirjeldus}</p>
    <div class="row">
        <div class="col-4">Nimi</div>
        <div class="col-4">Email</div>
        <div class="col-4">Märkus</div>
    </div>
    `
    for (let i=0; i<osalejad.length; i++) {
        osalejadEl.innerHTML += `
        <div class="row">
        <div class="col-4">${osalejad[i].nimi}</div>
        <div class="col-4">${osalejad[i].email}</div>
        <div class="col-4">${osalejad[i].markus}</div>
    </div>        
        `
    }

}


loeMatkad()
valjastaOsalejad(1)