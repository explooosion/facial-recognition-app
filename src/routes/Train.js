import React, { Component } from 'react';
import './Train.scss';

import { withRouter } from 'react-router-dom';
import Progress from 'react-progressbar';
import _ from 'lodash';

import { loadModels, getFullFaceDescription } from '../api/face';
import { formatDescriptors, downloadObjectAsJson } from '../utils';

// Initial State
const INIT_STATE = {
  name: 'Robby',
  images: [],
  descriptors: [],
  hasDownload: false,
  progress: 0,
  loading: false,
};

class Train extends Component {
  constructor(props) {
    super(props);
    this.state = { ...INIT_STATE, faceMatcher: null };
  }

  async componentDidMount() {
    await loadModels();
  }

  async onFileChange(files) {
    this.resetState();
    console.log('files', files);
    const images = Array.from(files).map(f => {
      return {
        name: f.name,
        valid: true,
        url: URL.createObjectURL(f),
      };
    });
    this.setState({ images });
  };

  resetState = () => {
    this.setState({ ...INIT_STATE });
  };

  async runFaceTrain() {
    if (_.isEmpty(this.state.name)) return alert('Please enter your name.');
    if (_.isEmpty(this.state.images)) return alert('Please select images.');
    console.log('Start to feature extraction');
    await this.setState({ hasDownload: false, progress: 0, descriptors: [], loading: true });
    await this.getDescriptors();
    await this.getResult();
  }

  async getDescriptors() {
    await this.state.images.forEach(async image => {
      const fullDesc = await getFullFaceDescription(image.url);
      console.log(image.name, fullDesc);
      const descriptors = this.state.descriptors;
      descriptors.push(fullDesc[0].descriptor);
      this.setState({ descriptors });
    });
  }

  getResult() {
    if (this.state.descriptors.length === this.state.images.length && !this.state.hasDownload) {
      this.setState({ hasDownload: true, progress: 100, loading: false });
      console.log('descriptors', this.state.descriptors);
      downloadObjectAsJson(formatDescriptors(this.state.name, this.state.descriptors), 'dataset');
    } else {
      let progress = this.state.progress > 90 ? 90 : this.state.progress + 30;
      progress = progress > 100 ? 100 : progress;
      setTimeout(() => {
        console.log(progress);
        this.setState({ progress }, () => this.getResult())
      }, 1000);
    }
  }

  render() {
    return (
      <div id='train' className={this.state.loading ? 'loading' : ''}>
        <header>圖片特徵提取 <small>Feature Extraction</small></header>
        <div className='train-tools'>
          <label htmlFor='uname'>Name:</label>
          <input className='tool-name' id='uname' type='text' value={this.state.name} onChange={(e) => this.setState({ name: e.target.value })} />
          <input
            className='tool-file'
            id="myFileUpload"
            type="file"
            onChange={(e) => this.onFileChange(e.target.files)}
            accept=".jpg, .jpeg, .png"
            multiple={true}
          />
          <button className='tool-start' type='button' onClick={() => this.runFaceTrain()}>開始特徵提取</button>
        </div>
        <Progress completed={this.state.progress} />
        <div className='train-images'>
          {this.state.images.map((image, index) => <img className='image' key={`image-${index}`} src={image.url} alt={image.name} />)}
        </div>
      </div >
    );
  }
}

export default withRouter(Train);
