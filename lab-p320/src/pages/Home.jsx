import { CommonPageContainer } from "../components/CommonpageContainer"
import {Row,Col} from "reactstrap"

export const Home=()=>{
    return(
        <CommonPageContainer>
            <Row>
                <Col xs={12}>
                    <h3 className="text-success mt-3">
                        This is Home Page
                    </h3>
                </Col>
            </Row>
        </CommonPageContainer>
    )
}