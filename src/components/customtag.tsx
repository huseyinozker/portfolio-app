import { Tag } from "primereact/tag";
import { Button } from "primereact/button";
const CustomTag = (props: any) => {
    return (
        <>
            <div className="p-d-flex p-mx-2">
                <Tag className="p-mr-2" value={props.tagLabel}></Tag>
                <div className="p-p-0">
                    <Button icon="pi pi-times" className="p-button-rounded" onClick={() => props.onRemove(props.tagLabel)}/>
                </div>
                
            </div>

        </>
    );
}
export default CustomTag;