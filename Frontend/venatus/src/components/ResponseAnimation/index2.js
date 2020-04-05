import React, { useState } from 'react';
import Lottie from 'react-lottie';

import './styles.css';
import OkAnimation from '../../assets/Animations/OkPopUp.json';
import ErrorAnimation from '../../assets/Animations/ErrorPopUp.json';

export default function ResponseAnimation() {

    [isStopped, setIsStopped] = useState(true);
    [message, setMessage] = useState('');

    //#region HandleAnimation()
        function showAnimationPopUp(element="", message="") {
			document.querySelector(`.AnimationPopUp.${element}`).style.display = "block";
			if (element === 'success') document.querySelector('.AnimationPopUp.success h1').innerHTML = message;
			else document.querySelector('.AnimationPopUp.error h1').innerHTML = message;
		}
	
		function hideAnimationPopUp(element="") {
			document.querySelector(`.AnimationPopUp.${element}`).style.display = "none";
		}

		function handleAnimationPopUp(element = "", message="") {
			this.showAnimationPopUp(element, message);
			setTimeout(() => {
				this.hideAnimationPopUp(element);
			}, 3000);
        }
    //#endregion

    function okAnimation(message="") {
        this.setState({isStopped: false});
        this.handleAnimationPopUp("success", message);
        setTimeout(() => {
            this.setState({isStopped: true});
        }, 3000);
    }

    function errorAnimation(message="") {
        this.setState({isStopped: false});
        this.handleAnimationPopUp("error", message);
        setTimeout(() => {
            this.setState({isStopped: true});
        }, 3000);
    }

    //#region AnimationSettings
        const okAnimationSettings = {
            loop: false,
            autoplay: false, 
            animationData: OkAnimation,
            rendererSettings: {
                preserveAspectRatio: 'xMidYMid slice'
            }
        };

        const errorAnimationSettings = {
            loop: false,
            autoplay: false, 
            animationData: ErrorAnimation,
            rendererSettings: {
                preserveAspectRatio: 'xMidYMid slice'
            }
        };
    //#endregion

    return (

        <>
            <div className="AnimationPopUp success">
                <Lottie options={okAnimationSettings}
                    height={100}
                    width={100}
                    isStopped={this.state.isStopped}
                />
                <h1>Livro adicionado com sucesso</h1>
            </div>

            <div className="AnimationPopUp error">
                <Lottie options={errorAnimationSettings}
                    height={100}
                    width={100}
                    isStopped={this.state.isStopped}
                />
                <h1>Algo deu errado</h1>
            </div>
        </>    
    );
}
