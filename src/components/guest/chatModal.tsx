/**
 * @name chat-modal
 * @description 미사용
 */
import { useState } from 'react';
import styled from 'styled-components';

const ChatModal = () => {
	// Modal-button Click시, useState 상태변경
	const [ModalShow, setModalShow] = useState(true);
	const toggleModalShow = () => setModalShow(!ModalShow);

	return (
		<ModalWrap className={ModalShow ? 'close' : 'open'}>
			<div className="outArea" onClick={toggleModalShow} />
			<div className="modalBox">
				<div className="chat-box">
					<input className="chat-title" placeholder="제목" />
					<input className="chat-body" placeholder="내용" />
				</div>
				<div className="button-box">
					<button className="delete-btn">삭제</button>
					<button className="edit-btn">수정</button>
				</div>
			</div>
		</ModalWrap>
	);
};

const ModalWrap = styled.div`
	position: relative;
	&.close {
		display: none;
	}
	&.open {
		display: block;
	}
	.outArea {
		width: 100%;
		height: 100vh;
		position: fixed;
		top: 0;
		left: 0;
		background: rgba(0, 0, 0, 0.3);
		z-index: 1;
		cursor: pointer;
	}
	.modalBox {
		width: 300px;
		height: 200px;
		display: flex;
		flex-flow: column nowrap;
		justify-content: space-between;
		position: fixed;
		top: 220px;
		left: 50%;
		transform: translate(-50%, 0);
		border-radius: 10px 10px 0 10px;
		padding: 15px;
		background: #ffcad4;
		box-shadow: 2px 3px 5px rgba(0, 0, 0, 0.15);
		z-index: 9;
		box-sizing: border-box;
		.chat-box {
			flex: 1 1 auto;
			display: flex;
			flex-flow: column nowrap;
			input {
				background: none;
				border: none;
				font-family: 'Noto Sans KR', sans-serif;
				color: #333;
				&:focus {
					outline: none;
				}
				&.chat-title {
					font-size: 15.5px;
					line-height: 18px;
					font-weight: 500;
					margin-bottom: 5px;
				}
				&.chat-body {
					font-size: 14px;
				}
			}
		}
		.button-box {
			flex: 0 0 auto;
			display: flex;
			flex-flow: row nowrap;
			justify-content: space-between;
			button {
				flex: 0 0 auto;
				background: none;
				border: none;
				font-size: 12.5px;
				font-weight: 700;
				cursor: pointer;
				&.delete-btn {
					color: #ff6347;
				}
				&.edit-btn {
					color: #5356ee;
				}
			}
		}
	}
`;

export default ChatModal;
