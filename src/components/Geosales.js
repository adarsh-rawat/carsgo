import {useEffect, useState } from "react";
import Chart from "chart.js/auto";
import './header.css'
import {Bar, Doughnut, Pie} from 'react-chartjs-2'

function Geosales(props){

    const [duration, setDuration] = useState(365);
    const [d, setd] = useState([]);      // d is used to store all the elements received from backend

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
        var x = document.getElementById('timeInput').value;
        setDuration(x)
    }

    function handleResponse(response){
        console.log(response)
        var dArray = []
        for(let i in response){
            console.log(response[i].data)

            dArray.push(<div className="chartTitle">{response[i].title}</div>)

            if(response[i].name === 'bar'){
                var chartData = {
                    labels: response[i].labels,
                    datasets: [
                        {
                            label: 'Number of Units sold',
                            data: response[i].data,
                            backgroundColor: 'rgba(53, 162, 235, 0.9)'
                        }
                    ]
                }
                dArray.push(<Bar className="bar_chart" options={barOptions} data={chartData}/>)
            }
            else if(response[i].name === 'pie'){
                let chartData = {
                    labels: response[i].labels,
                    datasets: [
                        {
                            data: response[i].data,
                            backgroundColor: [
                                '#36a2eb', '#ff6384', '#ff9f40', '#ffcd56', '#4bc0c0', '#96f'
                            ]
                        }
                    ]
                }
                dArray.push(<Pie className="pie_chart" data={chartData} />)
            }
            else if(response[i].name === 'doughnut'){
                let chartData = {
                    labels: response[i].labels,
                    datasets: [
                        {
                            data: response[i].data,
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
                dArray.push(<Doughnut className="doughnut_chart" data={chartData}/>)
            }
            //'bar_h' for horizontal bar chart
            else if(response[i].name === "bar_h"){
                let options = JSON.parse(JSON.stringify(barOptions))
                options.indexAxis = 'y'
                var chartData = {
                    labels: response[i].labels,
                    datasets: [
                        {
                            label: 'Number of Units sold',
                            data: response[i].data,
                            backgroundColor: '#fc6103c1'
                        }
                    ]
                }
                dArray.push(<Bar className="bar_chart" options={options} data={chartData}/>)
            }
        }
        setd(dArray)
    }

    useEffect(() =>{
        fetch('/geo',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(duration)
        })
        .then(res => res.json())
        .then(data => {handleResponse(data)})
    }, [duration])

    return (
        <>
        <Header handleInput={handleInput}/>
        {d}
        </>
    )
}

function Header(props){

    return (
        <div className='pageHeader'>
            <div className="pageTitle">Sales v Geo Report</div>
            <div className="pageHeaderInner">
                <select name="timeInput" id="timeInput" onChange={props.handleInput}>
                    <option value="365">Last 1 Year</option>
                    <option value='180'>Last 180 Days</option>
                    <option value='90'>Last 90 Days</option>
                    <option value='30'>Last 30 Days</option>
                </select>
            </div>
        </div>
    )

}


export default Geosales;