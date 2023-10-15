import React from 'react'
import '../css-component/Offcanvas.css'

const Offcanvas = (props) => {
    let tag = new Set();
    props.tags.forEach((e) => {
        tag.add(e.tag);
    })
    const tagArr = Array.from(tag);
    const colors = ["#87baf5", "#aa87f5", "#f0864a", "#f674ad", "#302c48", "#8ac3a3"]

    const tagClick = (e)=> {
        // console.log(String(e.target.textContent));
        props.getTagNote(e.target.textContent)
    }

    return (
        <>
            <div className="offcanvas offcanvas-end" data-bs-scroll="true" data-bs-backdrop="false" tabIndex="-1" id="offcanvasScrolling" aria-labelledby="offcanvasScrollingLabel">
                <div className="offcanvas-header">
                    <h3 className="offcanvas-title" id="offcanvasScrollingLabel">Tags</h3>
                    <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
                <hr />
                <div className="offcanvas-body">
                    <nav className="offcanvas-nav">
                        <ul>
                            {tagArr.map((e, index) => {
                                return (<div key={index}>
                                    <li className="offcanvas-li my-3 d-flex align-item-center justify-content-start" onClick={(e)=>{tagClick(e)}}>
                                        <div className="me-4 offcanvas-index" style={{ borderColor: `${colors[index%6]}` }} >{index + 1}</div>
                                        <h5>{e}</h5>
                                    </li>
                                    <hr />
                                </div>)
                            })}
                        </ul>
                    </nav>
                </div>
            </div>
        </>
    )
}

export default Offcanvas
