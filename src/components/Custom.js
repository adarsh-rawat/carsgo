import {useEffect, useState } from "react";
import Chart from "chart.js/auto";
import {Bar, Doughnut, Pie, Line} from 'react-chartjs-2';
import './custom.css';

function Custom(props){
    const [cReq, setReq] = useState({});        //cReq: Request details for chart
    const [Result, setResult] = useState(<></>);       //Result: will be used to store the response from the server
    
    //predefined options (settings) for bar charts
    const barOptions = {
        responsive: true,
        plugins: {
            legend: {
            position: 'top',
            },
            title: {
            display: true,
            },
        },
    }

    function handleInput(){
        console.log('Handle Input')
        document.getElementById('message').style.display = 'none';
        let duration = document.getElementById('timeInput').value;
        let field = document.getElementById('custom-field').value;
        setReq({
            'duration': duration,
            'field': field
        })
    }

    function handleResponse(response){
        console.log(response)
        let element;
        if(response.name === 'bar'){
            var chartData = {
                labels: response.labels,
                datasets: [
                    {
                        label: response.title,
                        data: response.data,
                        backgroundColor: 'rgba(53, 162, 235, 0.9)'
                    }
                ]
            }
            element = <Bar className="custom_bar_chart" options={barOptions} data={chartData}/>
        }
        else if(response.name === 'pie'){
            let chartData = {
                labels: response.labels,
                datasets: [
                    {
                        data: response.data,
                        backgroundColor: [
                            '#36a2eb', '#ff6384', '#ff9f40', '#ffcd56', '#4bc0c0', '#96f'
                        ]
                    }
                ]
            }
            element = <Pie className="pie_chart" data={chartData} />
        }
        else if(response.name === 'doughnut'){
            let chartData = {
                labels: response.labels,
                datasets: [
                    {
                        data: response.data,
                        backgroundColor: [
                            '#fc7e7a', '#61d0c6',
                            'rgba(255, 99, 132, 0.2)',
                            'rgba(54, 162, 235, 0.2)',
                            'rgba(255, 206, 86, 0.2)',
                            'rgba(75, 192, 192, 0.2)',
                            'rgba(153, 102, 255, 0.2)',
                            'rgba(255, 159, 64, 0.2)',
                        ],
                        borderColor: [
                            'rgba(255, 99, 132, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(255, 206, 86, 1)',
                            'rgba(75, 192, 192, 1)',
                            'rgba(153, 102, 255, 1)',
                            'rgba(255, 159, 64, 1)',
                        ],
                        borderWidth: 1,
                    }
                ]
            }
            console.log('doughnut.......')
            element = <Doughnut className="doughnut_chart" data={chartData}/>
        }
        //'bar_h' for horizontal bar chart
        else if(response.name === "line"){
            let options = JSON.parse(JSON.stringify(barOptions))
            var chartData = {
                labels: response.labels,
                datasets: [
                    {
                        label: response.title,
                        data: response.data,
                        borderColor: 'rgb(255, 99, 132)',
                        backgroundColor: 'rgba(255, 99, 132, 0.5)'
                    }
                ]
            }
            element = <Line className="bar_cart" options={options} data={chartData}/>
        }
        setResult(
            <>
            <div className="chartTitle">
                {response.title}
            </div>
            {element}
            </>
        )
    }

    useEffect(() =>{
        fetch('/custom',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(cReq)
        })
        .then(res => res.json())
        .then(data => {console.log(data);handleResponse(data)})
    }, [cReq])


    return (
        <div className="custom-container">
            <Header handleInput={handleInput}/>
            <div className="result">
                {Result}
            </div>
        </div>
    )
}

function Header(props){
    return(
        <div className='customHeader'>
                <div className="text">Please select: </div>
                <select name="field" id='custom-field' onChange={props.handleInput}>
                    <option value='0'>- select -</option>
                    <option value='Make'>Brand (Company)</option>
                    <option value='Body_Type'>Body Type</option>
                    <option value='City_Mileage'>City Mileage</option>
                    <option value='Doors'>Doors</option>
                    <option value='Emission_Norm'>Emission Norm</option>
                    <option value='Fuel_Type'>Fuel Type</option>
                    <option value='Highway_Mileage'>Highway Mileage</option>
                    <option value='Model_x'>Model</option>
                    <option value='Odometer'>Odometer</option>
                    <option value='Power'>Power</option>
                    <option value='Speedometer'>Speedometer</option>
                    <option value='Torque'>Torque</option>
                </select>
                <select name="timeInput" id="timeInput" onChange={props.handleInput}>
                    <option value="365">Last 1 Year</option>
                    <option value='180'>Last 180 Days</option>
                    <option value='60'>Last 60 Days</option>
                    <option value='30'>Last 30 Days</option>
                </select>
                <div className="message" id='message'>Please Select a category from Above.</div>
        </div>
    )
}

export default Custom;
