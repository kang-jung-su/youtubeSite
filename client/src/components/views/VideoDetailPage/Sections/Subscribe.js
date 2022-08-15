import Axios from 'axios'
import React, {useState, useEffect} from 'react'


function Subscribe(props) {

    const [SubscribeNumber, setSubscribeNumber] = useState(0);
    const [Subscribed, setSubscribed] = useState(false);
    const userTo = props.userTo;
    const userFrom = props.userFrom;


    useEffect(() => {
        
        let subscribeVariables = {
            userTo: userTo,
            userFrom: userFrom
        }

        Axios.post('/api/subscribe/subscribeNumber', subscribeVariables)
            .then(response=>{
                if(response.data.success){
                    setSubscribeNumber(response.data.subscribeNumber)
                }else{
                    alert('구독자 수 정보를 받아오지 못했습니다.')
                }
            })


        Axios.post('/api/subscribe/subscribed', subscribeVariables)
            .then(response=>{
                if(response.data.success){
                    setSubscribed(response.data.subscribed)
                }else{
                    alert('정보를 받아오지 못했습니다.')
                }
            })
    }, [userTo, userFrom])

    

    const onSubscribe = () =>{

        let subscribeVariable={
            userTo: userTo,
            userFrom: userFrom
        }

        if(Subscribed){  //이미 구독 중일 때
            
            Axios.post('/api/subscribe/unSubscribe', subscribeVariable)
                .then(response=>{
                    if(response.data.success){
                        setSubscribeNumber(SubscribeNumber - 1);
                        setSubscribed(!Subscribed);
                    }else{
                        alert('구독 취소하는데 실패했습니다.')
                    }
                })

        }else{ // 구동 중이 아닐 때

            Axios.post('/api/subscribe/subscribe', subscribeVariable)
            .then(response=>{
                if(response.data.success){
                    setSubscribeNumber(SubscribeNumber + 1);
                    setSubscribed(!Subscribed);
                }else{
                    alert('구독 하는데 실패했습니다.')
                }
            })
        }
    }

    return (
        <div>
            <button 
                style={{
                    background: `${Subscribed ?'#AAAAAA' : '#CC0000'}`, 
                    borderRadius: '4px', color: 'white', padding:'10px 16px', 
                    fontWeight: '500', fontSize: '1rem', textTransform: 'uppercase'
                }}
                onClick={onSubscribe}
            >
                {SubscribeNumber} {Subscribed ? 'Subscribed' : 'Subscribe'}
            </button>
        </div>
    )
}

export default Subscribe
