import "../../src/index.css"; 
import uuid from 'react-uuid';
import Panel from './post_panel.jsx'; 

const RenderPost = props => {
    const { postList } = props; 
    return (
        <div className = "w-11/12 md:w-6/12 mx-auto flex-grow z-10">
            {posts &&
                postList.map(post =>
                    <Panel
                        {...post}
                        key={uuid()}
                    />)
            }
        </div>
        )    
}

export default RenderPost; 