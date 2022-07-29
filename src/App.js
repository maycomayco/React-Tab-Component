import React from 'react';
import './style.css';

const TABS = [
  { title: 'Title #1', content: 'Content #1' },
  { title: 'Title #2', content: 'Content #2' },
  { title: 'Title #3', content: 'Content #3' },
];

function MyTabsComponent({ children, active = 0 }) {
  const [activeTab, setActiveTab] = React.useState(active);
  const [tabsData, setTabsData] = React.useState([]);
  // si cambia la tab, hacemos el re-render del component
  React.useEffect(() => {
    // guardamos la info de las tabs
    let data = [];
    // forEach no retorna un array, TODO: probarlo con .map()
    React.Children.forEach(children, (e) => {
      // verificamos si es un elem valido de react
      if ((!React.isValidElement(e)) || (!e.props.title)) return;
      const {
        props: { title, children },
      } = e;
      data.push({ title, children });
    });

    setTabsData(data);
  }, [children]);


  return <>
        {!!tabsData.length && (<>
            <div className="tabs">
                {tabsData.map(({ title }, idx) => (
                    <button
                        key={idx}
                        className={`btn${idx === activeTab ? '-active' : ''}`}
                        disabled={idx === activeTab}
                        onClick={() => setActiveTab(idx)}
                    >
                        {title}
                    </button>
                ))}
            </div>

            <div className="view">
                {tabsData[activeTab] && tabsData[activeTab].children}
            </div>
        </>)}
    </>
}

export default function App() {
  return (
    <div>
      <h1>Tabs component</h1>
      <MyTabsComponent>
        <div title={'Title 3'}>Content #3</div>
        <div title={'Title 4'}>Content #4</div> 
      </MyTabsComponent>
    </div>
  );
}
