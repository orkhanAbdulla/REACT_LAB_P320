import { CommonPageContainer } from "../components/CommonpageContainer"
import {Row,Col,Spinner, CardHeader, CardBody,Card} from "reactstrap"
import {INITIAL_ASYNC_VALUES} from '../consts'
import React from "react"
import axios from "axios"
import { createBrowserHistory } from "history"
import { range } from "range"


export const Products=()=>{
    const [productsData, setProductsData]=React.useState(INITIAL_ASYNC_VALUES)
    const history=createBrowserHistory()
    const params=new URLSearchParams(history.location.search)
    const page=params.get("page")
    const [currentPage,setCurrenPage]=React.useState(page??1)

    const getData=React.useCallback((page)=>{
        setProductsData(oldvalues=>({...oldvalues,loading:true}))
        axios.get(`https://reqres.in/api/products/?page=${page}&per_page=4`).then(({data})=>{
            setProductsData(oldvalues=>({...oldvalues,loading:false,data}))
        }).catch((error)=>{
            setProductsData({data:undefined,loading:false,error})
        })
    },[])

    React.useEffect(()=>{
        getData(page)
    },[currentPage])

    const handlePageChange=React.useCallback((ev)=>{
    const val=ev.target.value
    history.push(`?page=${val}`)
    setCurrenPage(val)
    },[history])

    const maxPageCount=React.useMemo(()=>((!!productsData.data&& productsData.data.total_pages)),[productsData])
    

    return(
        <CommonPageContainer>
            {productsData.loading&&(
               <div className="d-flex justify-content-center"><Spinner color="primary"/></div>
            )}
            {
              productsData.error&&(
                  <div className="text-danger">Error occured...</div>
              )  
            }
            {
             productsData.data&&(
                <>
                        <Row>
                 {productsData.data.data.map(({id,year,name,color})=>(
                    <Col key={id} className="mt-3" xs={4}>
                        <Card>
                            <CardHeader>
                                {name}
                            </CardHeader>
                            <CardBody>
                                <div className="d-flex justify-content-between">
                                    <div>
                                        year:{year}
                                    </div>
                                    <div className="d-flex align-items-center">
                                       <span style={{borderRadius:"50%",height:"32px",width:"32px",backgroundColor:color}}></span>
                                    </div>
                                </div>
                            </CardBody>
                        </Card>
                    </Col>
                 ))}   
              
            </Row>
            <Row className="mt-3">
                <Col xs={4}>
                    <select className="form-control" value={currentPage} onChange={handlePageChange}>
                        {!!maxPageCount&& range(1,maxPageCount+1).map((i)=>(
                           <option key={i} value={i}>{i}</option>
                        ))
                        }
                    </select>
                </Col>
            </Row>
                </>
             )  
            }
        
        </CommonPageContainer>
    )
}