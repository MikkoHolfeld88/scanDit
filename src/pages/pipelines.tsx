import {Pipeline as PipelineDesktop} from "../components/configuration/pipelines/desktop/pipeline";
import {Pipeline as PipelineMobile} from "../components/configuration/pipelines/mobile/pipeline";
import "./style.css"
import {selectIsTabletOrGreater} from "../store/slices/sidebar/selectors";
import {useSelector} from "react-redux";

export const Pipelines = () => {
    const isTableOrGreater = useSelector(selectIsTabletOrGreater)

    return (
        isTableOrGreater
            ? <PipelineDesktop/>
            : <PipelineMobile/>
    );
}
