import React from 'react';
import { Link } from 'react-router-dom';

function EgovFooter() {
    return (
        <div className="footer">
            <div className="inner">
                <h1>
                    <Link to="">
                        <img className="w" src="https://github.com/msa-ez/topping-egov-default/assets/123912988/98d7ace1-8448-4fb5-9570-0d96b4df769f" alt="" />
                        <img className="m" src="https://github.com/msa-ez/topping-egov-default/assets/123912988/3398d713-9cb1-47f8-a731-c40299cd87df" alt="" />
                    </Link>
                </h1>
                <div className="info">
                    <p>
                        대표문의메일 : egovframeexample@gmail.com  <span className="m_hide">|</span><br className="m_show" />  대표전화 : 0000-0000 (000-0000-0000)<br />
                        호환성확인 : 000-0000-0000  |  교육문의 : 0000-0000-0000
                    </p>
                    <p className="copy">Copyright © 2021 Ministry Of The Interior And Safety. All Rights Reserved.</p>
                </div>
                <div className="right_col">
                    <Link to="">
                        <img className="w" src="https://github.com/msa-ez/topping-egov-default/assets/123912988/0a0eab50-e64e-4f66-ad8c-2c1bd54731d0" alt="" />
                        <img className="m" src="https://github.com/msa-ez/topping-egov-default/assets/123912988/d0b113ed-48d8-4ef1-a0cf-79d30fe04612" alt="" />
                    </Link>
                    <Link to="">
                        <img className="w" src="https://github.com/msa-ez/topping-egov-default/assets/123912988/dc57a1b0-6b72-4fad-b51a-6e117b663ee4" alt="" />
                        <img className="m" src="https://github.com/msa-ez/topping-egov-default/assets/123912988/1bfdd1da-42f4-4c17-96ef-df7b9926a2eb" alt="" />
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default EgovFooter;