import React, { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import styled from 'styled-components';
import ChatItem from '../../components/guest/chatItem';
import Template from '../../components/template/template';

export interface IGuest {
	id: number;
	title: string;
	body: string;
	color: string;
	createAt: string;
}

function GuestPage() {
	const now = dayjs();
	const [title, setTitle] = useState<string>('');
	const [body, setBody] = useState<string>('');
	// Read
	const [data, setData] = useState<IGuest[]>([]);
	const reverse = [...data].reverse();
	useEffect(() => {
		fetch('http://localhost:4000/guest')
			.then((res) => {
				return res.json();
			})
			.then((data) => {
				setData(data);
			});
	}, []);

	// Create
	const [color, setColor] = useState('#ffcad4');
	function onSubmit(e: React.FormEvent) {
		e.preventDefault();

		fetch(`http://localhost:4000/guest`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				title: title,
				body: body,
				color: color,
				createAt: now.format('YYYY-MM-DD HH:mm'),
			}),
		}).then((res) => {
			if (res.ok) {
				alert('생성이 완료되었습니다');
				setTitle('');
				setBody('');
				setColor('#ffcad4');
				// Get 재요청
				fetch('http://localhost:4000/guest')
					.then((res) => {
						return res.json();
					})
					.then((data) => {
						setData(data);
					});
			} else {
				alert('생성이 실패하였습니다.');
			}
		});
	}

	return (
		<Template>
			<GuestWrap>
				<GuestTop>
					<h2>Guest-book</h2>
					<p>멋진 방명록을 남겨주세요.</p>
				</GuestTop>
				<ChatWrap>
					{data.length === 0 ? (
						<p className="no-data">데이터가 없습니다.</p>
					) : (
						// $ json-server ./src/store/data.json --port 4000
						reverse.map((o) => {
							return (
								<ChatItem
									key={o.id}
									id={o.id}
									color={o.color}
									title={o.title}
									body={o.body}
									createAt={o.createAt}
									setData={setData}
								/>
							);
						})
					)}
				</ChatWrap>
				<ChatInput>
					<form onSubmit={onSubmit}>
						<div className="input-wrap">
							<ChatBox style={{ background: color }}>
								<input
									className="chat-title"
									placeholder="제목"
									value={title}
									onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
										setTitle(e.target.value);
									}}
									required
								/>
								<input
									className="chat-body"
									placeholder="내용"
									value={body}
									onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
										setBody(e.target.value);
									}}
									required
								/>
							</ChatBox>
							<ColorSelect>
								<li className="color-1" onClick={() => setColor('#ffcad4')} />
								<li className="color-2" onClick={() => setColor('#ffe5d9')} />
								<li className="color-3" onClick={() => setColor('#cce4de')} />
								<li className="color-4" onClick={() => setColor('#dee5fc')} />
								<li className="color-5" onClick={() => setColor('#cbc0d3')} />
								<li className="color-6" onClick={() => setColor('#e9e9e9')} />
							</ColorSelect>
						</div>
						<SaveBtn>입력</SaveBtn>
					</form>
				</ChatInput>
			</GuestWrap>
		</Template>
	);
}

const GuestWrap = styled.div`
	width: 1200px;
	display: flex;
	flex-flow: column nowrap;
	justify-content: space-between;
	padding: 20px 120px;
	box-sizing: border-box;
	font-size: 15px;
`;
const GuestTop = styled.div`
	flex: 0 0 auto;
	display: flex;
	flex-flow: column nowrap;
	margin: 0 5px 20px;
	h2 {
		margin-bottom: 8px;
		font-size: 28px;
		line-height: 22px;
		color: #111;
	}
	p {
		font-size: 15px;
		font-weight: 300;
	}
`;
const ChatWrap = styled.ul`
	flex: 1 1 auto;
	display: flex;
	flex-flow: column nowrap;
	align-items: flex-end;
	padding-bottom: 75px;
	.no-data {
		margin: 20px 0;
		font-size: 14px;
		font-style: italic;
		font-weight: 300;
		color: #999;
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
const SaveBtn = styled.button`
	flex: 0 0 auto;
	height: 25px;
	padding: 0 10px;
	border: none;
	font-size: 13px;
	font-weight: 600;
	background: #333;
	color: #fff;
	border-radius: 3px;
	cursor: pointer;
	&.edit {
		position: absolute;
		top: 0;
		right: -55px;
	}
`;
const ChatInput = styled.div`
	width: 500px;
	display: flex;
	flex-flow: column nowrap;
	align-items: center;
	justify-content: center;
	position: fixed;
	bottom: 50px;
	left: 50%;
	transform: translate(-50%, 0);
	padding: 10px 0;
	background: rgba(80, 80, 80, 0.8);
	border-radius: 50px 50px 80px 80px;
	form {
		flex: 0 0 auto;
		display: flex;
		flex-flow: row nowrap;
		.input-wrap {
			display: flex;
			flex-flow: column nowrap;
			margin-right: 8px;
		}
	}
`;
const ColorSelect = styled.ul`
	flex: 0 0 auto;
	display: flex;
	flex-flow: row nowrap;
	margin-top: 5px;
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
		&.color-6 {
			background: #e9e9e9;
		}
	}
`;

export default GuestPage;
