import { useState } from 'react';
import styled from 'styled-components';
import editIcon from '../../assets/pencil.svg';
import deleteIcon from '../../assets/trash.svg';
import { IGuest } from '../../pages/guest/guest';

interface IProps {
	id: number;
	title: string;
	body: string;
	color: string;
	setData: React.Dispatch<React.SetStateAction<IGuest[]>>;
}

function ChatItem({ id, title, body, color, setData }: IProps) {
	const [edit, setEdit] = useState(false);
	const [editTitle, setEditTitle] = useState<string>(title);
	const [editBody, setEditBody] = useState<string>(body);
	const [editColor, setEditColor] = useState<string>(color);

	const editToggle = () => setEdit(!edit);

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
			<ChatBox style={{ background: `${editColor}` }}>
				<input
					className="chat-title"
					value={editTitle}
					onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
						setEditTitle(e.target.value);
					}}
					placeholder="제목"
					disabled={!edit}
					required
					autoFocus
				/>
				<input
					className="chat-body"
					value={editBody}
					onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
						setEditBody(e.target.value);
					}}
					placeholder="내용"
					disabled={!edit}
					required
				/>
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
					<ColorSelect>
						<li className="color-1" onClick={() => setEditColor('#ffcad4')} />
						<li className="color-2" onClick={() => setEditColor('#ffe5d9')} />
						<li className="color-3" onClick={() => setEditColor('#cce4de')} />
						<li className="color-4" onClick={() => setEditColor('#dee5fc')} />
						<li className="color-5" onClick={() => setEditColor('#cbc0d3')} />
					</ColorSelect>
				</>
			)}
		</ChatItemWrap>
	);
}

const ChatItemWrap = styled.li`
	flex: 0 0 auto;
	position: relative;
	margin-bottom: 13px;
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
`;
const ChatBox = styled.div`
	width: fit-content;
	height: fit-content;
	min-width: 250px;
	max-width: 500px;
	display: flex;
	flex-flow: column nowrap;
	padding: 10px;
	border-radius: 8px 8px 0 8px;
	box-shadow: 2px 3px 5px rgba(170, 170, 170, 0.5);
	input {
		background: none;
		/* border: 1px solid #bbb; */
		border: none;
		font-family: 'Noto Sans KR', sans-serif;
		color: #333;
		&:focus {
			outline: none;
		}
		&:disabled {
			border: none;
			&.chat-title {
				margin-bottom: 0;
			}
		}
		&.chat-title {
			/* margin-bottom: 5px; */
			font-size: 15.5px;
			line-height: 18px;
			font-weight: 500;
		}
		&.chat-body {
			font-size: 14px;
		}
	}
`;
const EditBtnWrap = styled.div`
	position: absolute;
	top: 0;
	right: -55px;
	display: flex;
	flex-flow: column;
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
const ColorSelect = styled.ul`
	flex: 0 0 auto;
	display: flex;
	flex-flow: row nowrap;
	margin-top: 8px;
	li {
		width: 20px;
		height: 20px;
		border-radius: 50%;
		margin-left: 8px;
		cursor: pointer;
		&:hover {
			border: 1px solid #333;
			box-sizing: border-box;
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
	}
`;

export default ChatItem;
