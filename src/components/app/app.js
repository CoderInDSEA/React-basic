import { Component } from 'react';

import './app.css';
import AppInfo from '../app-info/app-info';
import SearchPanel from '../search-panel/search-panel';
import AppFilter from '../app-filter/app-filter';
import EmployersList from '../employers-list/emloyers-list';
import EmployeesAddForm from '../employers-add-form/employers-add-form';


class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [
                { name: 'Yaroslav Kotov', salary: 800, increase: true, id: 1 },
                { name: 'Den Pen', salary: 3000, increase: false, id: 2 },
                { name: 'Len Key', salary: 1230, increase: false, id: 3 },
            ],
        }
        this.maxId = 4;
    }

    deleteItem = (id) => {
        this.setState(({ data }) => {
            return {
                data: data.filter(item => item.id !== id),
            }
        })
    }

    addItem = (name, salary) => {
        const lastIdObject = this.state.data.reduce((acc, curr) => acc.id > curr.id ? acc : curr);

        if (lastIdObject.id <= this.maxId && name && salary) {
            this.setState(({ data }) => {
                return {
                    data: [
                        ...data,
                        {
                            name,
                            salary,
                            increase: false,
                            id: lastIdObject.id + 1,
                        }
                    ]
                }
            });
        }
    }


    onToggleIncrease = (id) => {
        console.log(`Increase this ${id}`)
    }

    onToggleRise = (id) => {
        console.log(`Rise this ${id}`)
    }

    render() {
        return (
            <div className="app">
                <AppInfo />

                <div className="search-panel">
                    <SearchPanel />
                    <AppFilter />
                </div>

                <EmployersList
                    data={this.state.data}
                    onDelete={this.deleteItem}
                    onToggleIncrease={this.onToggleIncrease}
                    onToggleRise={this.onToggleRise} />
                <EmployeesAddForm
                    onAddEmployee={this.addItem} />
            </div>
        );
    }
}

export default App;