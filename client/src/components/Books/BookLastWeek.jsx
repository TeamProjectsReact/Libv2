import { Bar } from 'react-chartjs-2';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import  secureLocalStorage  from  "react-secure-storage"
import axios from 'axios';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

const BookLastWeek = () => {
    const navigate = useNavigate()
    //curent login user
    const EmailUser = secureLocalStorage.getItem("Login1");
    const RoleUser = secureLocalStorage.getItem("Login2");

    const [chartData, setChartData] = useState({});

    useEffect(() => {
        axios.get('http://localhost:5000/books/LastWeek')
        .then(res => {
            const data = res.data;
            const labels = data.map(item => item._id);
            const counts = data.map(item => item.count);
    
            setChartData({
              labels,
              datasets: [
                {
                  label: 'Books Added in Last 7 Days',
                  data: counts,
                  backgroundColor: 'rgba(75, 192, 192, 0.6)',
                  borderColor: 'rgba(75, 192, 192, 1)',
                  borderWidth: 1
                }
              ]
          })
        })
      .catch(error => console.error('Error fetching the book data:', error));
    })



    if(RoleUser !== null && EmailUser !== null) {
        return (
            <div>
                <div>
                    <h2>Books Added in Last 7 Days</h2>
                    {chartData.labels ? (
                        <Bar
                        data={chartData}
                        options={{
                            scales: {
                            y: {
                                beginAtZero: true
                            }
                            }
                        }}
                        />
                    ) : (
                        <p>Loading...</p>
                    )}
                    </div>
            </div>
        )
    }
    else{
        useEffect(() => {
            localStorage.clear()
            navigate('/')
        }, [])
    }

}

export default BookLastWeek