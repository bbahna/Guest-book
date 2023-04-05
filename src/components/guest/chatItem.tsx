import { useState } from 'react';
import dayjs from 'dayjs';
import styled from 'styled-components';
import editIcon from '../../assets/pencil.svg';
import deleteIcon from '../../assets/trash.svg';
import { IGuest } from '../../pages/guest/guest';
import ChatModal from '../../components/guest/chatModal';

interface IProps {
	id: number;
	title: string;
	body: string;
	color: string;
	date: string;
	setData: React.Dispatch<React.SetStateAction<IGuest[]>>;
}

function ChatItem({ id, title, body, color, date, setData }: IProps) {
	const now = dayjs();
	const [edit, setEdit] = useState(false);
	const editToggle = () => setEdit(!edit);
	const [editTitle, setEditTitle] = useState<string>(title);
	const [editBody, setEditBody] = useState<string>(body);
	const [editColor, setEditColor] = useState<string>(color);
	// ChatItem Click시, Modal 보기
	const [ModalShow, setModalShow] = useState(true);
	const toggleModalShow = () => setModalShow(!ModalShow);

	const onSubmit = () => {
		fetch(`http://localhost:4000/guest/${id}`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				title: editTitle,
				body: editBody,
				color: editColor,
				date: now.format('YYYY-MM-DD HH:mm'),
			}),
		}).then((res) => {
			if (res.ok) {
				alert('수정이 완료되었습니다');
				// Get 재요청
				fetch('http://localhost:4000/guest')
					.then((res) => {
						return res.json();
					})
					.then((data) => {
						setData(data);
					});
				setEdit(false);
			} else {
				alert('수정이 실패하였습니다.');
			}
		});
	};

	const onCancel = () => {
		setEditTitle(title);
		setEditBody(body);
		setEditColor(color);
		setEdit(false);
	};

	const onDelete = () => {
		if (window.confirm('삭제 하시겠습니까?')) {
			fetch(`http://localhost:4000/guest/${id}`, {
				method: 'DELETE',
			}).then((res) => {
				if (res.ok) {
					alert('삭제가 완료되었습니다');
					// Get 재요청
					fetch('http://localhost:4000/guest')
						.then((res) => {
							return res.json();
						})
						.then((data) => {
							setData(data);
						});
				} else {
					alert('삭제가 실패하였습니다.');
				}
			});
		}
	};

	return (
		<>
			<ChatItemWrap>
				{!edit && (
					<div className="hover-bar">
						<button className="edit-btn" onClick={editToggle}>
							<img src={editIcon} alt="수정아이콘" />
						</button>
						<button className="delete-btn" onClick={onDelete}>
							<img src={deleteIcon} alt="삭제아이콘" />
						</button>
					</div>
				)}
				<ChatBox style={{ background: `${editColor}` }} onClick={toggleModalShow}>
					<input
						value={editTitle}
						onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
							setEditTitle(e.target.value);
						}}
						placeholder="제목"
						disabled={!edit}
						required
						autoFocus
					/>
					{edit ? (
						<textarea
							value={editBody}
							onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
								setEditBody(e.target.value);
							}}
							className="chat-body"
							placeholder="내용"
							disabled={!edit}
							required
						/>
					) : (
						<p className="chat-body">{editBody}</p>
					)}
				</ChatBox>
				{edit && (
					<>
						<EditBtnWrap>
							<button className="saveBtn" onClick={onSubmit}>
								저장
							</button>
							<button className="cancelBtn" onClick={onCancel}>
								취소
							</button>
						</EditBtnWrap>
						<ul className="colorSelect">
							<li className="color-1" onClick={() => setEditColor('#ffcad4')} />
							<li className="color-2" onClick={() => setEditColor('#ffe5d9')} />
							<li className="color-3" onClick={() => setEditColor('#cce4de')} />
							<li className="color-4" onClick={() => setEditColor('#dee5fc')} />
							<li className="color-5" onClick={() => setEditColor('#cbc0d3')} />
							<li className="color-6" onClick={() => setEditColor('#e9e9e9')} />
						</ul>
					</>
				)}
			</ChatItemWrap>
			{!edit && (
				<ChatModal
					title={title}
					body={body}
					color={color}
					date={date}
					ModalShow={ModalShow}
					toggleModalShow={toggleModalShow}
				/>
			)}
		</>
	);
}

const ChatItemWrap = styled.li`
	flex: 0 0 auto;
	position: relative;
	margin: 0 7px 14px;
	&:hover .hover-bar {
		display: flex;
		flex-flow: row nowrap;
	}
	.hover-bar {
		display: none;
		position: absolute;
		top: 5px;
		right: 5px;
		border-radius: 5px;
		padding: 0 5px;
		background: #f3f3f3;
		button {
			display: flex;
			flex-flow: row nowrap;
			align-items: center;
			justify-content: center;
			width: 25px;
			height: 25px;
			border: none;
			background: none;
			cursor: pointer;
			&:hover {
				background: #e5e5e5;
			}
			img {
				height: 15px;
			}
		}
	}
	&:hover .colorSelect {
		flex: 0 0 auto;
		display: flex;
		flex-flow: row nowrap;
		position: absolute;
		bottom: 8px;
		li {
			width: 20px;
			height: 20px;
			border-radius: 50%;
			margin-left: 8px;
			border: 1px solid #fff;
			box-sizing: border-box;
			cursor: pointer;
			&:hover {
				border-color: #777;
			}
			&.color-1 {
				background: #ffcad4;
			}
			&.color-2 {
				background: #ffe5d9;
			}
			&.color-3 {
				background: #cce4de;
			}
			&.color-4 {
				background: #dee5fc;
			}
			&.color-5 {
				background: #cbc0d3;
			}
			&.color-6 {
				background: #dddddd;
			}
		}
	}
`;
const ChatBox = styled.div`
	width: 200px;
	height: 200px;
	display: flex;
	flex-flow: column nowrap;
	padding: 10px;
	border-radius: 8px 8px 0 8px;
	box-shadow: 2px 3px 5px rgba(170, 170, 170, 0.5);
	cursor: pointer;
	input {
		background: none;
		border: none;
		font-family: 'Noto Sans KR', sans-serif;
		color: #333;
		font-size: 15.5px;
		line-height: 18px;
		font-weight: 500;
		margin-bottom: 0;
		text-overflow: ellipsis;
		overflow: hidden;
		&:focus {
			outline: none;
		}
		&:disabled {
			border: none;
		}
	}
	p {
		white-space: normal;
		display: -webkit-box;
		-webkit-line-clamp: 9;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}
	.chat-body {
		flex: 1;
		background: none;
		border: none;
		font-family: 'Noto Sans KR', sans-serif;
		color: #333;
		font-weight: 400;
		font-size: 14px;
		resize: none;
		padding: 0;
		&:focus {
			outline: none;
		}
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
	}
`;
const EditBtnWrap = styled.div`
	position: absolute;
	top: 0;
	right: -55px;
	display: flex;
	flex-flow: column;
	z-index: 1;
	button {
		flex: 0 0 auto;
		height: 25px;
		padding: 0 10px;
		border: none;
		font-size: 13px;
		font-weight: 600;
		border-radius: 3px;
		color: #fff;
		cursor: pointer;
		&.saveBtn {
			background: #333;
			margin-bottom: 5px;
		}
		&.cancelBtn {
			background: #bbb;
		}
	}
`;

export default ChatItem;
