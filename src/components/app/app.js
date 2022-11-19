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
                { name: 'Yaroslav Kotov', salary: 800, increase: true, increasePosition: true, id: 1 },
                { name: 'Den Pen', salary: 3000, increase: false, increasePosition: false, id: 2 },
                { name: 'Len Key', salary: 1230, increase: false, increasePosition: false, id: 3 },
            ],
            term: '',
            filter: 'all',
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


    onToggleProp = (id, prop) => {
        this.setState(({ data }) => ({
            data: data.map(item => {
                if (item.id === id) {
                    return { ...item, [prop]: !item[prop] }
                }

                return item;
            }),
        }))
    }

    searchEmp = (items, term) => {
        if (!term.length) {
            return items;
        }

        return items.filter(item => {
            return item.name.indexOf(term) > -1;
        });
    }

    onUpdateSearch = (term) => {
        this.setState({ term });
    }

    filterPos = (items, filter) => {
        switch (filter) {
            case 'increase':
                return items.filter(item => item.increase);
            case 'moreThan1000':
                return items.filter(item => item.salary > 1000);
            default: 
                return items;
        };
    }

    onFilterSelect = (filter) => {
        this.setState({filter});
    }

    render() {
        const { data, term, filter } = this.state
        const employees = data.length;
        const increased = data.filter(item => item.increasePosition).length;
        const visibleData = this.filterPos(this.searchEmp(data, term), filter);

        return (
            <div className="app">
                <AppInfo employees={employees} increased={increased} />

                <div className="search-panel">
                    <SearchPanel onUpdateSearch={this.onUpdateSearch} />
                    <AppFilter filter={filter} onFilterSelect={this.onFilterSelect}/>
                </div>

                <EmployersList
                    data={visibleData}
                    onDelete={this.deleteItem}
                    onToggleProp={this.onToggleProp} />
                <EmployeesAddForm
                    onAddEmployee={this.addItem} />
            </div>
        );
    }
}

export default App;