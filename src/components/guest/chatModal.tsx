import styled from 'styled-components';

interface IProps {
	title: string;
	body: string;
	color: string;
	createAt: string;
	ModalShow: boolean;
	toggleModalShow: () => void;
}

const ChatModal = ({ ModalShow, toggleModalShow, title, body, color, createAt }: IProps) => {
	return (
		<ModalWrap className={ModalShow ? 'close' : 'open'}>
			<div className="outArea" onClick={toggleModalShow} />
			<div className="modalBox" style={{ background: `${color}` }}>
				<div className="chat-box">
					<p className="chat-title">{title}</p>
					<p className="chat-body">{body}</p>
				</div>
				<div className="bottom-box">
					<p className="date-text">{createAt}</p>
				</div>
				{/* <div className="bottom-box">
					<button className="delete-btn">삭제</button>
					<button className="edit-btn">수정</button>
				</div> */}
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
		width: 500px;
		height: 400px;
		display: flex;
		flex-flow: column nowrap;
		justify-content: space-between;
		position: fixed;
		top: 120px;
		left: 50%;
		transform: translate(-50%, 0);
		border-radius: 10px 10px 0 10px;
		padding: 15px;
		box-shadow: 2px 3px 5px rgba(0, 0, 0, 0.15);
		z-index: 9;
		box-sizing: border-box;
		overflow-x: hidden;
		overflow-y: auto;
		&::-webkit-scrollbar {
			width: 8px;
		}
		&::-webkit-scrollbar-thumb {
			background-color: #bbb;
			border-radius: 10px;
			cursor: pointer;
		}
		&::-webkit-scrollbar-track {
			background-color: #eee;
			border-radius: 10px;
		}
		.chat-box {
			flex: 1 1 auto;
			display: flex;
			flex-flow: column nowrap;
			p {
				background: none;
				border: none;
				font-family: 'Noto Sans KR', sans-serif;
				color: #333;
				word-wrap: break-word;
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
		.bottom-box {
			flex: 0 0 auto;
			display: flex;
			flex-flow: row nowrap;
			justify-content: space-between;
			.date-text {
				flex: 1;
				font-size: 12px;
				color: #777;
				text-align: right;
				font-style: italic;
			}
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
