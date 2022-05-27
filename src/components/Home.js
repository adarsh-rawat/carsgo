import { useNavigate } from "react-router-dom";
import './home.css'

function Home(props){

    const navigate = useNavigate();
    return (
        <div className="page-inner head">
            <h1 className="main-head"><b>CarsGo</b></h1>
            <p className="text-secondary">A platform to analyse sales data to help Automobile Industry in making informed decisions.</p>
            <h4 className="secondary-head">Features:</h4>
            <ul className='main-list' style={{maxWidth: 400}}>
                <li className="list-item">Generate charts based on sales data.</li>
                <li className="list-item">Generate Report based on Regions/Countries.</li>
                <li className="list-item">Generate Various types of custom reports.</li>
            </ul>
            <div onClick={() => navigate('/sales')} className="homeButton">Sales Reports</div>
            <div onClick={() => navigate('/custom-report')} className="homeButton">Custom Reports</div>
            <div className="tips">
                <p>Quick Tips:<br/>
                1. Hover over elements to see numbers<br/>
                2. Change Time Duration using dropdown in top-right corner<br/>
                3. Responsive on all Screen Sizes <br/>(Recommended: 1920 x 1080p)<br/>
                </p>
            </div>
        </div>
    )
}

export default Home;