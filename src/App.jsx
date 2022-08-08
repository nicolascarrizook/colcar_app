import React from 'react';
import { Header } from './components/Header';
import { SearchInput } from './components/SearchInput';

export const App = () => {

    const title = 'Búsqueda de Infracciones';

    return (
        <div className='container'>
            <Header
                title={title}
            />
            <SearchInput /> 
        </div>
    )
}