import { useState } from 'react';
import Template from '../../components/template/template';
import './main.scss';

function MainPage() {
	// Modal-button Click시, useState 상태변경
	const [ModalShow, setModalShow] = useState(true);
	const toggleModalShow = () => setModalShow(!ModalShow);

	return (
		<Template>
			<div className="main-wrap">
				<section className="pageExplain">
					1. 메인 페이지
					<br />- 게시판 글 목록
				</section>
				<section className="madalView">
					{/* Modal-button */}
					<button className="madalBtn" onClick={toggleModalShow}>
						Modal view
					</button>
					{/* Modal-contents */}
					<div className={`madalWrap ${ModalShow ? 'close' : 'open'}`}>
						<div className="outArea" onClick={toggleModalShow} />
						<div className="modalBox">당신은 Modal을 발견했습니다.</div>
					</div>
				</section>
			</div>
		</Template>
	);
}

export default MainPage;
