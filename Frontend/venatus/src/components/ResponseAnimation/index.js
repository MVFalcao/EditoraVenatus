import React, { Component } from 'react';
import Lottie from 'react-lottie';

import './styles.css';
import OkAnimation from '../../assets/Animations/OkPopUp.json';
import ErrorAnimation from '../../assets/Animations/ErrorPopUp.json';

export default class ResponseAnimation extends Component {

    state = {
        isStopped: true,
        message: '',
    }
    
    //#region HandleAnimation()
		showAnimationPopUp = (element="", message="") => {
			document.querySelector(`.AnimationPopUp.${element}`).style.display = "block";
			if (element === 'success') document.querySelector('.AnimationPopUp.success h1').innerHTML = message;
			else document.querySelector('.AnimationPopUp.error h1').innerHTML = message;
		}
	
		hideAnimationPopUp = (element="") => {
			document.querySelector(`.AnimationPopUp.${element}`).style.display = "none";
		}

		handleAnimationPopUp = (element = "", message="") => {
			this.showAnimationPopUp(element, message);
			setTimeout(() => {
				this.hideAnimationPopUp(element);
			}, 3000);
        }
    //#endregion
    
        okAnimation = (message="") => {
            this.setState({isStopped: false});
            this.handleAnimationPopUp("success", message);
            setTimeout(() => {
                this.setState({isStopped: true});
            }, 3000);
        }

        errorAnimation = (message="") => {
            this.setState({isStopped: false});
            this.handleAnimationPopUp("error", message);
            setTimeout(() => {
                this.setState({isStopped: true});
            }, 3000);
        }


    render() {
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
}
