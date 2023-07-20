import React from 'react'
import classes from './Dashboard.module.css';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
// import { batchInfoActions } from '../redux/BatchSlice';
// import { FetchBatchInfo } from '../API/FetchBatchInfo';
// import { FetchCurrentBatch } from '../API/FetchCurrentBatch';
// import BatchCard from '../components/BatchCard';
import { RotateToken } from './API/RotateToken';
const Dashboard = () => {
    const dispatch = useDispatch();

    // const batchInfo = useSelector(state => state.batchInfoReducer.allBatchInfo);

    // const isMessageVisible = useSelector(state => state.batchInfoReducer.isMessageVisible);
    // const batchesShow = useSelector(state => state.batchInfoReducer.batchesShow);

    // const enrollDate = useSelector(state => state.batchInfoReducer.enrollDate);
    // const batchTiming = useSelector(state => state.batchInfoReducer.batchTiming);

    // const expiryDate  =new Date();

    // if(enrollDate!=null){
    //     expiryDate.setDate(30);
    // }
    // RotateToken();

    // FetchCurrentBatch();
    // FetchBatchInfo();

    // const fetchingBatches = useSelector(state => state.batchInfoReducer.fetchingBatches);

    const navigate = useNavigate();
    const logoutHandler = () => {
        localStorage.removeItem("refresh");
        navigate("/");
        window.location.reload();
    }
    //---------------------------------
    const [inputValue, setInputValue] = useState('');
    const [TotalAttempt, setTotalAttempt] = useState(0);
    const [Corrected, setCorrected] = useState(0);
    const [Wrong, setWrong] = useState(0);
    const [Drop, setDrop] = useState(0);
    const [TotalScore, setTotalScore] = useState(0);
    const [responseObj, setResponseObj] = useState([]);

    const [showInputSection, setShowInputSection] = useState(true);

    // Event handler to update the input value
    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };
    const [loadingState, setLoadingState] = useState(false);
    const [scoreCardShow, setScoreCardShow] = useState(false);
    const fetchScore = async () => {
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(
                {
                    url: inputValue
                }
            )
        }
        setScoreCardShow(false)
        setLoadingState(true)
        fetch('http://127.0.0.1:8000/cuetscore', options)
            .then((resp) => {
                return resp.json();
            })
            .then((data) => {
                console.log(data);
                if(data.status=="perfect"){

                    setTotalAttempt(data.totalAttempt);
                    setCorrected(data.corrected)
                    setDrop(data.drop);
                    setWrong(data.wrong)
                    setTotalScore(data.totalScore)
                    setResponseObj(data.responseObj);
                    setScoreCardShow(true)
                    setLoadingState(false)
                }
                else{
                    setShowInputSection(false);
                    setLoadingState(false)
                }
            })
            // .catch((error)=>{
            //     console.log("got error");
            // })
    }
    return (
        <>
            <header className={classes.header}>
                <nav className={classes.nav1}>
                    <div className={classes.logo}>CUET SCORE </div>
                </nav>
                <nav className={classes.nav2}>

                    {/* <button
                        className={classes.hphAuthSection}
                        onClick={logoutHandler}
                    >
                        logout
                    </button> */}
                </nav>
            </header>
            {
                (showInputSection)
                &&
                <section className={classes.batchInfo1}>
                    <input
                        type="text"
                        value={inputValue}
                        onChange={handleInputChange}
                        className={classes.linkInput}
                        placeholder='Enter Answer Key link Here'
                    />
                    <button className={classes.hphAuthSection}
                        onClick={fetchScore}
                    >Check
                    </button>
                </section>
            }
            {
                (!showInputSection)
                &&
                <section className={classes.batchInfo1}>
                    <div className={classes.statement}>
                        Sorry Given Link Is Invalid!!
                    </div>
                    <button className={classes.hphAuthSection}
                        onClick={()=>{
                            setShowInputSection(true);
                        }}
                    >Okay
                    </button>
                </section>
            }

            <main className={classes.main}>

                {
                    (loadingState)
                    &&
                    <>
                        <div className={classes.skeleton}></div>
                        {/* <div className={classes.skeleton}></div>
                        <div className={classes.skeleton}></div>
                        <div className={classes.skeleton}></div> */}
                    </>
                }

                <main className={classes.main}>

                    {
                        (scoreCardShow == true)
                        &&
                        <div className={classes.currentBatch}>
                            {/* <div className={classes.batchLeft}>
                            <section className={classes.batchHeading}>
                                    <span className={classes.subject}>
                                        Rank 
                                    </span>
                                    <span >

                                    </span>
                                </section>
                            </div> */}
                            <div className={classes.batchRight}>
                                <section className={classes.batchHeading}>
                                    <span className={classes.subject}>
                                        Score Card
                                    </span>
                                    <span >

                                    </span>
                                </section>
                                <section className={classes.subHeadings}>
                                    <span className={classes.subject}>
                                        TotalAttempt
                                    </span>
                                    <span >
                                        {TotalAttempt}
                                    </span>
                                </section>
                                <section className={classes.subHeadings}>
                                    <span className={classes.subject}>
                                        Corrected
                                    </span>
                                    <span>
                                        {Corrected}
                                    </span>
                                </section>
                                <section className={classes.subHeadings}>
                                    <span className={classes.subject}>
                                        Wrong
                                    </span>
                                    <span>
                                        {Wrong}
                                    </span>
                                </section>
                                <section className={classes.subHeadings}>
                                    <span className={classes.subject}>
                                        Drop
                                    </span>
                                    <span>
                                        {Drop}
                                    </span>
                                </section>
                                <section className={classes.batchHeading}>
                                    <span className={classes.subject}>
                                        Total Score
                                    </span>
                                    <span>
                                        {TotalScore}
                                    </span>
                                </section>
                                {/* <section className={classes.batchHeading}>
                                    <span className={classes.subject}>
                                        Predicted Rank
                                    </span>
                                    <span >
                                        348
                                    </span>
                                </section> */}
                            </div>
                        </div>
                    }
            </main>

        </main > 
        </>
    )
}

export default Dashboard