/*       */

import React from 'react';
import { Component, PropTypes, Transition, View } from '../../libs';
import { Progress } from '../../src';

export default class UploadList extends Component {
  constructor(props        ) {
    super(props);
  }

  render()                     {
    const { onPreview, onRemove } = this.context;
    const { listType, fileList } = this.props;
    const isFinished = status => status === 'success';
    return (
      <Transition
        component="ul"
        className={this.classNames({
          'el-upload-list': true,
          [`el-upload-list--${listType}`]: true
        })}
        name="list"
      >
        {fileList.map(file => (
          <li
            className={this.classNames({
              'el-upload-list__item': true,
              [`is-${file.status}`]: true
            })}
            key={file.uid}
          >
            {['picture-card', 'picture'].includes(listType) &&
              isFinished(file.status) &&
              <img
                className="el-upload-list__item-thumbnail"
                src={file.url}
                alt=""
              />}

            <a
              className="el-upload-list__item-name"
              onClick={() => onPreview(file)}
            >
              <i className="el-icon-document" />{file.name}
            </a>
            <View
              className="el-upload-list__item-status-label"
              show={isFinished(file.status)}
              component="label"
            >
              <i
                className={this.classNames({
                  'el-icon-circle-check': listType === 'text',
                  'el-icon-check': ['picture-card', 'picture'].includes(
                    listType
                  )
                })}
              />
              <i className="el-icon-close" onClick={() => onRemove(file)} />
            </View>
            <View
              className="el-upload-list__item-actions"
              show={listType === 'picture-card' && isFinished(file.status)}
            >
              <span
                onClick={() => onPreview(file)}
                className="el-upload-list__item-preview"
              >
                <i className="el-icon-view" />
              </span>
              <span
                className="el-upload-list__item-delete"
                onClick={() => onRemove(file)}
              >
                <i className="el-icon-delete2" />
              </span>
            </View>
            {file.status === 'uploading' &&
              <Progress
                strokeWidth={listType === 'picture-card' ? 6 : 2}
                type={listType === 'picture-card' ? 'circle' : 'line'}
                percentage={parseInt(file.percentage, 10)}
                status={
                  isFinished(file.status) && file.showProgress ? 'success' : ''
                }
              />}
          </li>
        ))}
      </Transition>
    );
  }
}

UploadList.contextTypes = {
  onPreview: PropTypes.func,
  onRemove: PropTypes.func
};

UploadList.propTypes = {
  listType: PropTypes.string,
  fileList: PropTypes.array
};
