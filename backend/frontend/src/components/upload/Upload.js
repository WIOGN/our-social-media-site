import React from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Upload.css'


class Upload extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            file: null
        }
    }

    handleImageSelect = (event) => {
        this.setState({
            file: event.target.files[0]
        });
    }

    handleUpload = async () => {
        var formdata = new FormData()
        formdata.append('image', this.state.file)

        try {
            var res = await axios.post('/api/upload', formdata)
            console.log(res)
            console.log(res.json())
        }
        catch (err) {
            alert("Error occurred while uploading")
        }
    }



    render() {
        return (
            <div className="container-fluid h-100">
                <div className="row justify-content-center align-items-center h-100">
                    <div className="col col-sm-6 col-md-6 col-lg-4 col-xl-3 specialBox">
                        <h3>Upload Form</h3>
                        <input type="file" className="form-control form-control-lg" onChange={this.handleImageSelect} />
                        <button className="btn-lg btn-block uploadButton" onClick={this.handleUpload}>Upload</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default Upload;