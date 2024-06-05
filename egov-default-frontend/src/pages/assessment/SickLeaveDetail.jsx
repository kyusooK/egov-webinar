
import { useEffect, useState } from 'react'

import { Link, useLocation, useNavigate } from 'react-router-dom'

import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import TextField from '@mui/material/TextField';

import axios from 'axios';

import * as EgovNet from 'api/egovFetch'
import { NOTICE_BBS_ID } from 'config'
import URL from 'constants/url'

import EgovAttachFile from 'components/EgovAttachFile'
import { default as EgovLeftNav } from 'components/leftmenu/EgovLeftNavInform'

function EgovNoticeDetail(props) {
    console.group("EgovNoticeDetail");
    console.log("EgovNoticeDetail [props] : ", props);

    const navigate = useNavigate();
    const location = useLocation();
    console.log("EgovNoticeDetail [location] : ", location);

    // const bbsId = location.state.bbsId || NOTICE_BBS_ID;
    const id = location.state.id;
    const searchCondition = location.state.searchCondition;

    const [applySalaryopen, setApplySalaryOpen] = useState(false);
    const [requestSickLeaveBenefitopen, setRequestSickLeaveBenefitOpen] = useState(false);
    const condition = true; 

    const [entity, setEntity] = useState("");

    const [key, setKey] = useState('');
    const [averageSalary, setAverageSalary] = useState('');

    const [masterBoard, setMasterBoard] = useState({});
    const [boardDetail, setBoardDetail] = useState({});

    const retrieveDetail = () => {
        const retrieveDetailURL = `/sickLeaves/${id}`;
        const requestOptions = {
            method: "GET",
            headers: {
                'Content-type': 'application/json'
            }
        }
        EgovNet.requestFetch(retrieveDetailURL,
            requestOptions,
            function (resp) {
                setBoardDetail(resp);
            }
        );
    }
    useEffect(function () {
        retrieveDetail();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    function fetchSickLeave(id){
        axios.get(`/sickLeaves/${id}`)
        .then(response => {
            setBoardDetail(response.data);
        })
    }

    function deleteList(){
        axios.delete(`/sickLeaves/${id}`)
        navigate('/assessment/sickLeaves');
    }

    function applySalary(){
        const data = { id:key, averageSalary };
        axios.put(`/sickLeaves/${id}/applysalary`, data) 
        .then(response => {
            const resp = response.data
            if(!resp){
                navigate({pathname: URL.ERROR}, {state: {msg: resp.resultMessage}});
            }else{
                setApplySalaryOpen(false);
                fetchSickLeave(id);
            }
        });
    }
    function requestSickLeaveBenefit(){

        axios.put(`/sickLeaves/${id}/requestsickleavebenefit`, {id: entity }) 
        .then(response => {
            const resp = response.data
            if(!resp){
                navigate({pathname: URL.ERROR}, {state: {msg: resp.resultMessage}});
            }else{
                setRequestSickLeaveBenefitOpen(false);
                fetchSickLeave(id);
            }
        });
    }


    return (
        <div className="container">
            <div className="c_wrap">
                {/* <!-- Location --> */}
                <div className="location">
                    <ul>
                        <li><Link to={URL.MAIN} className="home">Home</Link></li>
                        <li><Link to="/assessment/sickLeaves">휴업급여</Link></li>
                        <li>{masterBoard && masterBoard.bbsNm}</li>
                    </ul>
                </div>
                {/* <!--// Location --> */}

                <div className="layout">
                    {/* <!-- Navigation --> */}
                    <EgovLeftNav></EgovLeftNav>
                    {/* <!--// Navigation --> */}

                    <div className="contents NOTICE_VIEW" id="contents">
                        {/* <!-- 본문 --> */}

                        <div className="top_tit">
                            <h1 className="tit_1">휴업급여</h1>
                        </div>

                        {/* <!-- 게시판 상세보기 --> */}
                        <div className="board_view">
                            <div className="board_view_top">
                                <div className="tit">{id}</div>
                                <div className="info">
                                    <dl>
                                        <dt>휴업급여</dt>
                                        <dd>{id}</dd>
                                    </dl>
                                    <dl>
                                        <dt>요양급여심사코드</dt>
                                        <dd>{boardDetail && boardDetail.accessmentId }</dd>
                                    </dl>
                                    <dl>
                                        <dt>산재신청코드</dt>
                                        <dd>{boardDetail && boardDetail.accidentId }</dd>
                                    </dl>
                                    <dl>
                                        <dt>사업장코드</dt>
                                        <dd>{boardDetail && boardDetail.businessCode }</dd>
                                    </dl>
                                    <dl>
                                        <dt>고용인ID</dt>
                                        <dd>{boardDetail && boardDetail.employeeId }</dd>
                                    </dl>
                                    <dl>
                                        <dt>평균임금</dt>
                                        <dd>{boardDetail && boardDetail.averageSalary }</dd>
                                    </dl>
                                    <dl>
                                        <dt>기간</dt>
                                        <dd>{boardDetail && boardDetail.period }</dd>
                                    </dl>
                                    <dl>
                                        <dt>진행상태</dt>
                                        <dd>{boardDetail && boardDetail.status }</dd>
                                    </dl>
                                </div>
                            </div>
                            <div className="board_btn_area">
                                <div style={{ display: "flex", flexDirection: "row"}}>
                                    <div style={{marginTop: "5px"}}>
                                        <button className="btn btn_blue_h46 w_140"
                                         onClick={() => {
                                            if (condition) {  
                                            setApplySalaryOpen(true);
                                            }
                                        }}>
                                            평균임금 적용
                                        </button>
                                    </div>
                                </div>
                                <div className="right_col btn1" style={{marginTop: "5px"}}>
                                    <Link to="/assessment/sickLeaves"
                                        className="btn btn_blue_h46 w_100">목록</Link>
                                </div>
                                <div className="right_col btn1" style={{marginTop: "5px", marginRight: "9%"}}>
                                    <button
                                        onClick={deleteList}
                                        className="btn btn_blue_h46 w_100">삭제
                                    </button>
                                </div>
                            </div>
                        </div>
                        {/* <!-- 게시판 상세보기 --> */}
                        <div>
                            <Dialog open={applySalaryopen} onClose={() => setApplySalaryOpen(false)}>
                                <DialogTitle>평균임금 적용</DialogTitle>
                                <DialogContent>
                                    <TextField 
                                        autoFocus
                                        margin="dense"
                                        id="id"
                                        label="Id"
                                        type="text"
                                        fullWidth
                                        value={key}
                                        onChange={(e) => setKey(e.target.value)}
                                    />
                                    <TextField 
                                        autoFocus
                                        margin="dense"
                                        id="averageSalary"
                                        label="AverageSalary"
                                        type="text"
                                        fullWidth
                                        value={averageSalary}
                                        onChange={(e) => setAverageSalary(e.target.value)}
                                    />
                                </DialogContent>
                                <DialogActions>
                                    <button onClick={() => setApplySalaryOpen(false)} className="btn btn_blue_h46 w_100">
                                        취소
                                    </button>
                                    <button onClick={applySalary} className="btn btn_blue_h46 w_100">
                                    평균임금 적용
                                    </button>
                                </DialogActions>
                            </Dialog>
                        </div>
                        <div>
                        </div>
                        
                        {/* <!--// 본문 --> */}
                    </div>
                </div>
            </div>
        </div>
    );
}
export default EgovNoticeDetail;
