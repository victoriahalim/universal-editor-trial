function hasWrapper(e){
    return !!e.firstElementChild&&"block"===window.getComputedStyle(e.firstElementChild).display
    }

export default function decorate(e){
    [...e.children].forEach((e=>{const n=e.children[0],a=document.createElement("summary");
    a.className="accordion-item-label",a.append(...n.childNodes),hasWrapper(a)||(a.innerHTML=`<p>${a.innerHTML}</p>`);
    const r=e.children[1];r.className="accordion-item-body",hasWrapper(r)||(r.innerHTML=`<p>${r.innerHTML}</p>`);
    const t=document.createElement("details");t.className="accordion-item",t.append(a,r),e.replaceWith(t)}))
    }