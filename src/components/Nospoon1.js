import { Button, Col, DatePicker, Input, Layout, Row, Space, Table, Select, ConfigProvider } from "antd";
import axios from "axios";
import { useEffect, useRef, useState } from "react";


export default function Nospoon() {
    // const [status, setStatus] = useState("dklee");

    // table handling variables
    const [loading, setLoading] = useState(false);
    const [dataSource, setDataSource] = useState([]);
    
    const [pagination, setPagination] = useState({ current: 1, pageSize: 10});
    const [sort, setSort] = useState('cruzlink.TRN_GID.keyword');
    const [filter, setFilter] = useState('');

    const [resultcount, setResultCount] = useState(0);
    const [resulttook, setResultTook] = useState(0);

    const [resultstart, setResultStart] = useState(0);
    const [resultend, setResultEnd] = useState(0);

    // data handling variables
    const [gid, setGid] = useState("");
    const [proc_sts, setProcSts] = useState("");
    const [proc_sts2, setProcSts2] = useState("");
    
    const [proc_node, setProcNode] = useState("");
    const [execute_proc, setExecuteProc] = useState("");
    //
    const [trn_drctn, setTrnDrctn] = useState("");
    const [trn_suc_dt, setTrnSucDt] = useState("");
    const [on_dat_sze, setOnDatSze] = useState("");
    const [bknd_svc_cd, setOnBnkdSvcCd] = useState("");
    const [err_cntn, setOnErrCntn] = useState("");
    const [filter1, setOnFilter1] = useState("");
    const [filter2, setOnFilter2] = useState("");
    const [filter3, setOnFilter3] = useState("");
    const [filter4, setOnFilter4] = useState("");
    const [filter5, setOnFilter5] = useState("");
    const [filter6, setOnFilter6] = useState("");

    
    // const [chan_id, setChanId] = useState("");
    const [if_ptrn, setIfPtrn] = useState("");
    const [if_id, setIfId] = useState("");
    const [trn_cor_gid, setTrnCorGid] = useState("");
    const [trn_mst_seq, setTrnMstSeq] = useState("");


    const [start_date, setStartDate] = useState("");
    const [end_date, setEndDate] = useState("");

    const [isOff, setIsOff] = useState(true);
    // etc
    const mounted = useRef(false);
    const [count, setCount] = useState(0);

    const columns = [
        {
            title: "NO",
            dataIndex: "NUM",
            // rowScope: 'row',
            width: "3%"
        },
        {
            title: "거래발생일시",
            dataIndex: "timestamp",
            width: "6%"
        },
        {
            title: "소요시간",
            dataIndex: "",
            width: "6%"
        },
        {
            title: "인터페이스ID",
            dataIndex: "IF_ID",
            width: "6%"
        },
        {
            title: "인터페이스명",
            dataIndex: "",
            width: "6%"
        },
        {
        title: "GID",
        dataIndex: "TRN_GID",
        width: "10%",
        // align: "left",
        sorter: (a, b) => a.gid - b.gid,
        //   sortDirections: ["descend"],
        ellipsis: false,
        },
        {
        title: "대표거래SEQ",
        dataIndex: "TRN_MST_SEQ",
        width: "10%",
        },
        {
        title: "처리상태",
        dataIndex: "PROC_STS",
        width: "3%",
        },
        {
        title: "에러상세내역",
        dataIndex: "ERR_CNTN",
        width: "10%"
        },
    ];

    const getRandomuserParams = (params) => ({
        results: params.pagination.pageSize,
        page: params.pagination.current,
        ordering: params.sort_query,
        ...params,
    });

    const { Header, Footer, Content } = Layout;
    const { RangePicker } = DatePicker;
    const headerStyle = {
        textAlign: "center",
        color: "#fff",
        height: 30,
        // paddingInline: 50,
        lineHeight: 2,
        backgroundColor: "#000",
    };
    const buttonStyle = {
        fontSize: "small",
        
    }
    const contentStyle = {
        textAlign: "center",
        minHeight: 768,
        // 수정됨
        lineHeight: "24px",
        color: "#000",
        backgroundColor: "#909090",
    };
    // 수정됨
    const fieldStyle = {
        color: "#fff",
        backgroundColor: "#000",
        
    };
    const valueStyle = {
        color: "#fff",
        backgroundColor: "#efefef",
    };

    const selectStyle = {
        width: "100%",
    }
    const inputStyle = {
        width: "100%",
    }

    const footerStyle = {
        height : 30,
        lineHeight: 2,
        padding: 0,
        textAlign: "center",
        color: "#fff",
        backgroundColor: "#000",
    };

    useEffect(() => {
        console.log('start loading...');
    }, []);

    useEffect(() => {
        console.log("count loading...", count);
        if (!mounted.current) {
            mounted.current = true;
        } else  {
            fetch({ pagination, filter, sort });
        }
    }, [count]);

    const fetch = (params = {}) => {
        setLoading(true);
        console.log(params);
        console.log(getRandomuserParams(params));

        axios({
        url: 'http://1.234.25.132:40513/api/grammars/master/',
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        data: {
            gid: gid,
            proc_sts: proc_sts,
            // 수정됨
            proc_sts2: proc_sts2,
            proc_node: proc_node,
            execute_proc: execute_proc,
            //
            trn_drctn: trn_drctn,
            trn_suc_dt: trn_suc_dt,
            on_dat_sze: on_dat_sze,
            bknd_svc_cd: bknd_svc_cd, 
            err_cntn: err_cntn,

            filter1: filter1,
            filter2: filter2,
            filter3: filter3,
            filter4: filter4,
            filter5: filter5,
            filter6: filter6,


            if_id: if_id,
            if_ptrn: if_ptrn,
            trn_cor_gid: trn_cor_gid,
            trn_mst_seq: trn_mst_seq,
            params: params,
            start_date: start_date,
            end_date: end_date,
        }
        }).then((response) => {
        console.log('response...', response);
        setResultCount(response.data.data.count);
        setResultTook(response.data.data.took);
        setResultStart(response.data.data.start_date);
        setResultEnd(response.data.data.end_date);

        // console.log("test.seq.:", trn_mst_seq);
        console.log("current....:", params.pagination.current);

        const fileData = response.data.response.hits.hits.map((item, key) => {
            return {
            TRN_GID: item._source.cruzlink.TRN_GID,
            PROC_STS: item._source.cruzlink.PROC_STS,
            TRN_MST_SEQ: item._source.cruzlink.TRN_MST_SEQ,
            PROC_NODE: item._source.cruzlink.PROC_NODE,
            IF_ID: item._source.cruzlink.IF_ID,           
            NUM: params.pagination.current == 1 ? key + 1 : ((params.pagination.current - 1) * params.pagination.pageSize) + key + 1,
            // timestamp: item._source.cruzlink.ED_DT + "" + item._source.cruzlink.ED_HMS,
            timestamp: item._source["@timestamp"],
            };
            // data.response.hits.hits[0]._source["@timestamp"]
        });
        setDataSource(fileData);
        // setSearchResultCount(response.data.count);
        setPagination({
            ...params.pagination,
            total: response.data.data.count,
        });
        setLoading(false);
        });
    };

    const onChange = (value, dateString) => {
        console.log("Selected Time: ", value);
        console.log("Formatted Selected Time: ", dateString);
        console.log("test1", dateString[0], dateString[1]);
        setStartDate(dateString[0]);
        setEndDate(dateString[1]);
    };
    const onOk = (value) => {
        console.log("onOk: ", value);
    };

    function onChangeGID(e) {
        setGid(e.target.value);
        console.log(e.target.value);
        console.log(`selected?! ${e.target.value}`);
    }

    function onChangeProcSTS(e) {
        // setProcSts(e.target.value);
        // console.log(e.target.value);
        // console.log(`selected! ${e.target.value}`);
        setProcSts(e);
        console.log(`select ProcSTS ${e}`);
    }

    function onClickSearch() {
        console.log(gid);
        setCount(count + 1);
        setPagination({ current: 1, pageSize: 10 });
        // axios({
        //   url: "http://1.234.25.132:40543/api/grammars/master/",
        //   method: "POST",
        //   headers: {
        //     "Content-Type": "application/json",
        //   },
        //   data: {
        //     gid: gid,
        //   }
        // }).then((response) => {
        //   console.log(response.data.hits.hits);
        //   // setStatus(response.data.status);
        // });
    }
    function onClickToggle(){
        console.log('Toggle....', isOff);
        setIsOff(!isOff);
        // isOff ? 'ON' : 'OFF';
      };

    const handleTableChange = (pagination, filters, sorter) => {
        // console.log('pagination', pagination);
        // console.log('filters', filters);
        // console.log('sorter', sorter);

    // const filters_dict_type = filters.dict_type_display
    //   ? filters.dict_type_display.reduce((result, item) => {
    //       console.log(item);
    //       return `${result}&dict_type=${item}`;
    //     }, "")
    //   : "";
    // console.log(filters_dict_type);
    // const filters_type = filters.type_display
    //   ? filters.type_display.reduce((result, item) => {
    //       console.log(item);
    //       return `${result}&type=${item}`;
    //     }, "")
    //   : "";
    // console.log(filters_type);

    // const filters_category = filters.category_display
    //   ? filters.category_display.reduce((result, item) => {
    //       console.log(item);
    //       return `${result}&category=${item}`;
    //     }, "")
    //   : "";
    // console.log(filters_category);

    // const filters_pos = filters.pos_display
    //   ? filters.pos_display.reduce((result, item) => {
    //       console.log(item);
    //       return `${result}&pos=${item}`;
    //     }, "")
    //   : "";
    // console.log(filters_pos);

    // const filters_status = filters.status_display
    //   ? filters.status_display.reduce((result, item) => {
    //       console.log(item);
    //       return `${result}&status=${item}`;
    //     }, "")
    //   : "";
    // console.log(filters_status);

    // const filters_query =
    //   filters_dict_type +
    //   filters_type +
    //   filters_category +
    //   filters_pos +
    //   filters_status;
    // console.log(filters_query);

        setFilter('');

        setSort(sorter.field
            ? sorter.order === "descend"
            ? "-cruzlink." + sorter.field + ".keyword"
            : "cruzlink." + sorter.field + ".keyword"
            : "cruzlink.TRN_GID.keyword");

        fetch({
            pagination,
            filter,
            sort,
        });
    };

    const onChangeProcSTS2 = (e) => {
        setProcSts2(e);
        console.log(`selected ProcSTS2? ${e}`);
    };

    const onSearch = (e) => {
        console.log('search:', e);
    };

    // const onChangeChanId = (e) => {
    //     setChanId(e);
    //     console.log(`selected? ${e}`);
    // };

    const onChangeProcNode = (e) => {
        setProcNode(e);
        console.log(`selected ${e}`);
    };

    const onChangeExecuteProc = (e) => {
        setExecuteProc(e);
        console.log(`selected ${e}`);
    };

    const onChangeTrnDrctn = (e) => {
        setTrnDrctn(e);
        console.log(`selected ${e}`);
    };

    const onChangeIfId = (e) => {
        setIfId(e);
        console.log(`selected ${e}`);
    };

    const onChangeIfPtrn = (e) => {
        setIfPtrn(e);
        console.log(`selected ${e}`);
    };

    function onChangeTrnCorGid(e) {
        setTrnCorGid(e.target.value);
        console.log(e.target.value);
        console.log(`selected! ${e.target.value}`);
    }

    function onChangeTrnMstSeq(e) {
        setTrnMstSeq(e.target.value);
        console.log(e.target.value);
        console.log(`selected! ${e.target.value}`);
    }    

    function onChangeTrnSucDt(e) {
        setTrnSucDt(e.target.value);
        console.log(e.target.value);
        console.log(`selected! ${e.target.value}`);
    }
    
    function onChangeOnDatSze(e) {
        setOnDatSze(e.target.value);
        console.log(e.target.value);
        console.log(`selected! ${e.target.value}`);
    }

    function onChangeBkndSvcCd(e) {
        setOnBnkdSvcCd(e.target.value);
        console.log(e.target.value);
        console.log(`selected! ${e.target.value}`);
    }

    function onChangeErrCntn(e) {
        setOnErrCntn(e.target.value);
        console.log(e.target.value);
        console.log(`selected! ${e.target.value}`);
    }

    function onChangeFilter1(e) {
        setOnFilter1(e.target.value);
        console.log(e.target.value);
        console.log(`selected! ${e.target.value}`);
    }

    function onChangeFilter2(e) {
        setOnFilter2(e.target.value);
        console.log(e.target.value);
        console.log(`selected! ${e.target.value}`);
    }

    function onChangeFilter3(e) {
        setOnFilter3(e.target.value);
        console.log(e.target.value);
        console.log(`selected! ${e.target.value}`);
    }

    function onChangeFilter4(e) {
        setOnFilter4(e.target.value);
        console.log(e.target.value);
        console.log(`selected! ${e.target.value}`);
    }

    function onChangeFilter5(e) {
        setOnFilter5(e.target.value);
        console.log(e.target.value);
        console.log(`selected! ${e.target.value}`);
    }

    function onChangeFilter6(e) {
        setOnFilter6(e.target.value);
        console.log(e.target.value);
        console.log(`selected! ${e.target.value}`);
    }

    return (
    <>
        
            
            <Space
                direction="vertical"
                style={{
                width: "100%",
                }}
                size={[0, 48]}
            >
            <Layout style={{backgroundColor: "#000"}}>
                <Header style={headerStyle}>Nospoon</Header>
                <Content style={contentStyle}>
                    <Space
                        direction="vertical"
                        size={[0, 48]}
                        // 수정됨
                        style={{
                            width: "90%",
                            rowGap: 0,
                        }}
                    >
                    <div>
                        <Row >
                        <Col span={12} style={{fontSize: "18px", textAlign : "left", fontWeight: "bold"}}>
                            온라인 로그(Opensearch)
                        </Col>
                        <Col span={12} style={{  textAlign : "right"}}>
                            <Space>
                            <Button type="primary"  size="small" onClick={onClickSearch}  style={{buttonStyle}}>
                                조회
                            </Button>
                            <Button type="primary" size="small" style={{buttonStyle}} onClick={onClickToggle}>{isOff ? '확대' : '축소'}</Button>
                            </Space>
                        </Col>
                        </Row>
                    </div>
                    <div>
                        <Row>
                            <Col span={12}>
                                <Row>
                                <Col span={6} style={fieldStyle}>거래일자</Col>
                                <Col span={18} style={valueStyle}>
                                    <RangePicker style={{width: "97%"}}
                                        size="small"
                                        showTime={{
                                            format: "HH:mm",
                                        }}
                                        format="YYYY-MM-DD HH:mm"
                                        onChange={onChange}
                                        onOk={onOk}
                                    />
                                </Col>
                                </Row>
                                <Row>
                                    <Col span={12}>
                                        {/* 수정 */}
                                        <Row>
                                        <Col span={12} style={fieldStyle}>채널정보</Col>
                                        <Col span={12} style={valueStyle}>
                                            <Input style={inputStyle}
                                                size="small"
                                                placeholder="소스/타겟 채널ID명 검색"
                                                // value={chan_id}
                                                // onChange={onChangeChanId}
                                            />
                                        </Col>
                                        </Row>
                                        {/* 수정 */}
                                        <div hidden={isOff}>
                                        <Row>
                                        <Col span={12} style={fieldStyle}>대표거래SEQ</Col>
                                        <Col span={12} style={valueStyle}>
                                            <Input style={inputStyle}
                                            size="small"
                                            placeholder=""
                                            value={trn_mst_seq}
                                            onChange={onChangeTrnMstSeq}
                                            />
                                        </Col>
                                        </Row>
                                        {/* 수정 */}
                                        <Row>
                                        <Col span={12} style={fieldStyle}>소요시간(sec)</Col>
                                        <Col span={12} style={valueStyle}>
                                            <Input style={inputStyle}
                                            size="small"
                                            placeholder="최소값을 입력해주세요."
                                            value={trn_suc_dt}
                                            onChange={onChangeTrnSucDt}
                                            />
                                        </Col>
                                        </Row>
                                        {/* 수정 */}
                                        <Row>
                                        <Col span={12} style={fieldStyle}>필터1</Col>
                                        <Col span={12} style={valueStyle}>
                                            <Input style={inputStyle}
                                            size="small"
                                            placeholder=""
                                            value={filter1}
                                            onChange={onChangeFilter1}
                                            />
                                        </Col>
                                        </Row>
                                        {/* 수정 */}
                                        <Row>
                                        <Col span={12} style={fieldStyle}>필터5</Col>
                                        <Col span={12} style={valueStyle}>
                                            <Input style={inputStyle}
                                            size="small"
                                            placeholder=""
                                            value={filter5}
                                            onChange={onChangeFilter5}
                                            />
                                        </Col>
                                        </Row>
                                        </div>
                                    </Col>
                                    <Col span={12}>
                                        {/* 수정 */}
                                        <Row>
                                        <Col span={12} style={fieldStyle}>연계유형</Col>
                                        <Col span={12} style={valueStyle}>
                                            <Select style = {selectStyle}
                                                size={"small"}
                                                showSearch
                                                placeholder="선택해주세요"
                                                optionFilterProp="IF_PTRN"
                                                onChange={onChangeIfPtrn}
                                                onSearch={onSearch}
                                                filterOption={(input, option) =>
                                                    (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                                                }
                                                bordered
                                                options={[
                                                    { value: "", label: "선택 없음", },
                                                    { value: "T2T", label: "T2T", },
                                                ]}
                                            />
                                        </Col>
                                        </Row>
                                        {/* 수정 */}
                                        <div hidden={isOff}>
                                        <Row>
                                        <Col span={12} style={fieldStyle}>노드정보</Col>
                                        <Col span={12} style={valueStyle}>
                                        <Select style = {selectStyle}
                                            size="small"
                                            showSearch
                                            placeholder="선택해주세요"
                                            optionFilterProp="PROC_NODE"
                                            onChange={onChangeProcNode}
                                            onSearch={onSearch}
                                            filterOption={(input, option) =>
                                                (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                                            }
                                            options={[
                                                { value: "", label: "선택 없음", },
                                                { value: "0101", label: "0101", },
                                            ]}
                                        />  
                                        </Col>
                                        </Row>
                                        {/* 수정 */}
                                        <Row>
                                        <Col span={12} style={fieldStyle}>데이터크기(byte)</Col>
                                        <Col span={12} style={valueStyle}>
                                            <Input style={inputStyle}
                                            size="small"
                                            placeholder="최소값을 입력해주세요."
                                            value={on_dat_sze}
                                            onChange={onChangeOnDatSze}
                                            />
                                        </Col>
                                        </Row>
                                        {/* 수정 */}
                                        <Row>
                                        <Col span={12} style={fieldStyle}>필터2</Col>
                                        <Col span={12} style={valueStyle}>
                                            <Input style={inputStyle}
                                            size="small"
                                            placeholder=""
                                            value={filter2}
                                            onChange={onChangeFilter2}
                                            />
                                        </Col>
                                        </Row>
                                        {/* 수정 */}
                                        <Row>
                                        <Col span={12} style={fieldStyle}>필터6</Col>
                                        <Col span={12} style={valueStyle}>
                                            <Input style={inputStyle}
                                            size="small"
                                            placeholder=""
                                            value={filter6}
                                            onChange={onChangeFilter6}
                                            />
                                        </Col>
                                        </Row>
                                        </div>
                                    </Col>
                                </Row>
                            </Col>
                            <Col span={6}>
                                <Row>
                                    <Col span={12} style={fieldStyle}>GID</Col>
                                    <Col span={12} style={valueStyle}>
                                        <Input style={inputStyle}
                                        size="small"
                                        placeholder=""
                                        value={gid}
                                        onChange={onChangeGID}
                                        />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col span={12} style={fieldStyle}>인터페이스정보</Col>


                                    <Col span={12} style={valueStyle}>
                                    <Select style = {selectStyle}
                                            size="small"
                                            showSearch
                                            placeholder="선택해주세요"
                                            // placeholder="인터페이스ID/명 검색"
                                            optionFilterProp="IF_ID"
                                            onChange={onChangeIfId}
                                            onSearch={onSearch}
                                            filterOption={(input, option) =>
                                                (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                                            }
                                            // allowClear
                                            options={[
                                                { value: "", label: "선택 없음", },
                                                { value: "CPM_ONL_00", label: "CPM_ONL_00", },
                                                { value: "CPM_ONL_01", label: "CPM_ONL_01", },
                                                { value: "CPM_ONL_02", label: "CPM_ONL_02", },
                                                { value: "CPM_ONL_03", label: "CPM_ONL_03", },
                                                { value: "CPM_ONL_04", label: "CPM_ONL_04", },
                                                { value: "CPM_ONL_05", label: "CPM_ONL_05", },
                                                { value: "CPM_ONL_06", label: "CPM_ONL_06", },
                                                { value: "CPM_ONL_07", label: "CPM_ONL_07", },
                                                { value: "CPM_ONL_08", label: "CPM_ONL_08", },
                                                { value: "CPM_ONL_09", label: "CPM_ONL_09", },
                                                { value: "CPM_ONL_10", label: "CPM_ONL_10", },
                                                { value: "CPM_ONL_11", label: "CPM_ONL_11", },
                                                { value: "CPM_ONL_12", label: "CPM_ONL_12", },
                                                { value: "CPM_ONL_13", label: "CPM_ONL_13", },
                                                { value: "CPM_ONL_14", label: "CPM_ONL_14", },
                                                { value: "CPM_ONL_15", label: "CPM_ONL_15", },
                                                { value: "CPM_ONL_16", label: "CPM_ONL_16", },
                                                { value: "CPM_ONL_17", label: "CPM_ONL_17", },
                                                { value: "CPM_ONL_18", label: "CPM_ONL_18", },
                                                { value: "CPM_ONL_19", label: "CPM_ONL_19", },
                                            ]}
                                        />  
                                    </Col>
                                </Row>
                                {/* 수정 */}
                                <div hidden={isOff}> 
                                <Row>
                                    <Col span={12} style={fieldStyle}>실행 유형</Col>
                                    <Col span={12} style={valueStyle}>
                                    <Select style = {selectStyle}
                                        size="small"
                                        showSearch
                                        placeholder="선택해주세요"
                                        optionFilterProp="EXECUTE_PROC"
                                        onChange={onChangeExecuteProc}
                                        onSearch={onSearch}
                                        filterOption={(input, option) =>
                                            (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                                        }
                                        options={[
                                            { value: "", label: "선택 없음", },
                                            { value: "O", label: "O", },
                                        ]}
                                    />  
                                    </Col>
                                </Row>
                                {/* 수정 */}
                                <Row>
                                    <Col span={12} style={fieldStyle}>백엔드 서버 코드</Col>
                                    <Col span={12} style={valueStyle}>
                                        <Input style={inputStyle}
                                        size="small"
                                        placeholder=""
                                        value={bknd_svc_cd}
                                        onChange={onChangeBkndSvcCd}
                                        />
                                    </Col>
                                </Row>
                                {/* 수정 */}
                                <Row>
                                    <Col span={12} style={fieldStyle}>필터 3</Col>
                                    <Col span={12} style={valueStyle}>
                                        <Input style={inputStyle}
                                        size="small"
                                        placeholder=""
                                        value={filter3}
                                        onChange={onChangeFilter3}
                                        />
                                    </Col>
                                </Row>
                                {/* 수정 */}
                                <Row>
                                    <Col span={12}></Col>
                                    <Col span={12}>
                                        {/* <Input
                                        placeholder="PROC_STS"
                                        value={proc_sts}
                                        onChange={onChangeProcSTS}
                                        /> */}
                                    </Col>
                                </Row>
                                </div>
                            </Col>
                            <Col span={6}>
                                {/* 수정 */}
                                <Row>
                                    <Col span={12} style={fieldStyle}>처리 상태</Col>
                                    <Col span={12} style={valueStyle}>
                                    <Select style = {selectStyle}
                                        size="small"
                                        showSearch
                                        placeholder="선택해주세요"
                                        optionFilterProp="PROC_STS"
                                        onChange={onChangeProcSTS}
                                        onSearch={onSearch}
                                        filterOption={(input, option) =>
                                            (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                                        }
                                        options={[
                                            { value: '', label: '선택 없음', },
                                            { value: 'OK', label: 'OK', },
                                            { value: 'ING', label: 'ING', },
                                            { value: 1901, label: 1901, },
                                            { value: 1807, label: 1807, },
                                            { value: 1801, label: 1801, },
                                            { value: 1809, label: 1809, },
                                            { value: 1006, label: 1006, },
                                            { value: 5003, label: 5003, },
                                        ]}
                                    />
                                    </Col>
                                </Row>
                                {/* 수정 */}
                                <Row>
                                    <Col span={12} style={fieldStyle}>거래일련번호</Col>
                                    <Col span={12} style={valueStyle}>
                                        <Input style={inputStyle}
                                        size="small"
                                        placeholder=""
                                        value={trn_cor_gid}
                                        onChange={onChangeTrnCorGid}
                                        />
                                    </Col>
                                </Row>
                                <div hidden={isOff}>
                                <Row>
                                    <Col span={12} style={fieldStyle}>거래방향</Col>
                                    <Col span={12} style={valueStyle}>
                                    <Select style = {selectStyle}
                                        size="small"
                                        showSearch
                                        placeholder="선택해주세요"
                                        optionFilterProp="TRN_DRCTN"
                                        onChange={onChangeTrnDrctn}
                                        onSearch={onSearch}
                                        filterOption={(input, option) =>
                                            (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                                        }
                                        options={[
                                            { value: "", label: "선택 없음", },
                                        ]}
                                    />  
                                    </Col>
                                </Row>
                                <Row>
                                    <Col span={12} style={fieldStyle}>에러상세내역</Col>
                                    <Col span={12} style={valueStyle}>
                                        <Input style={inputStyle}
                                        size="small"
                                        placeholder=""
                                        value={err_cntn}
                                        onChange={onChangeErrCntn}
                                        />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col span={12} style={fieldStyle}>필터4</Col>
                                    <Col span={12} style={valueStyle}>
                                        <Input style={inputStyle}
                                        size="small"
                                        placeholder=""
                                        value={filter4}
                                        onChange={onChangeFilter4}
                                        />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col span={12}></Col>
                                    <Col span={12}>
                                        {/* <Input
                                        placeholder="PROC_STS"
                                        value={proc_sts}
                                        onChange={onChangeProcSTS}
                                        /> */}
                                    </Col>
                                </Row>
                                </div>
                            </Col>
                        </Row>
                        
                        {/* <Row>2</Row>
                        <Row>3</Row>
                        <Row>4</Row>
                        <Row>5</Row>
                        <Row>6</Row> */}
                        </div>
                        <div style={{textAlign : "left", fontSize: 12}}>
                            Count: {resultcount}, Took: {resulttook}, Start: {resultstart}, End: {resultend},
                        </div>
                        <div>
                            <Table
                                loading={loading}
                                bordered
                                // rowSelection={rowSelection}
                                rowKey={"id"}
                                columns={columns}
                                dataSource={dataSource}
                                size="small"
                                pagination={pagination}
                                scroll={{
                                    x: 2000, 
                                    y: 610,
                                }}
                                onChange={handleTableChange}
                                
                            ></Table>
                        </div>
                    </Space>
                </Content>
                <Footer style={footerStyle}>Written by MJKim</Footer>
            </Layout>
            </Space>

    </>
    );
}