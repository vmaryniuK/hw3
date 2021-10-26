
const SideBar = ({ contactCounter, privateCounter, friendCounter, familyCounter, workCounter }) => {
    return (
        <div className="col-lg-3 col-md-4 col-sm-12">
            <div className="contacts-labels">
                <div className="title">All contacts<span>{contactCounter}</span></div>
                <div className="list">
                    <div className="input-group">
                        <input type="text" className="contacts-search" placeholder="Search" />
                    </div>
                    <div className="head">Labels</div>
                    <div className="unit">
                        <div className="lab lab-success">Work</div><span>{workCounter}</span>
                    </div>
                    <div className="unit">
                        <div className="lab lab-primary">Family</div><span>{familyCounter}</span>
                    </div>
                    <div className="unit">
                        <div className="lab lab-danger">Private</div><span>{privateCounter}</span>
                    </div>
                    <div className="unit">
                        <div className="lab lab-warning">Friends</div><span>{friendCounter}</span>
                    </div>
                    <button type="button" className="btn btn-primary font-weight-700">Add new label</button>
                </div>
            </div>
        </div>
    )
}
export default SideBar;