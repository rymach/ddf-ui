/**
 * Copyright (c) Codice Foundation
 *
 * This is free software: you can redistribute it and/or modify it under the terms of the GNU Lesser
 * General Public License as published by the Free Software Foundation, either version 3 of the
 * License, or any later version.
 *
 * This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without
 * even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU
 * Lesser General Public License for more details. A copy of the GNU Lesser General Public License
 * is distributed along with this program and can be found at
 * <http://www.gnu.org/licenses/lgpl.html>.
 *
 **/

const ContentView = require('../content.view')
const uploadInstance = require('../../upload/upload.js')
const ResultSelectorView = require('../../result-selector/result-selector.view.js')
const VisualizationView = require('../../golden-layout/golden-layout.view.js')

module.exports = ContentView.extend({
  className: 'is-upload',
  selectionInterface: uploadInstance,
  initialize() {
    this._mapView = new VisualizationView({
      selectionInterface: uploadInstance,
      configName: 'goldenLayoutUpload',
    })
  },
  onFirstRender() {
    this.listenTo(
      uploadInstance,
      'change:currentUpload',
      this.updateContentLeft
    )
  },
  onRender() {
    this.updateContentLeft()
    if (this._mapView) {
      this.contentRight.show(this._mapView)
    }
  },
  updateContentLeft() {
    this.contentLeft.show(
      new ResultSelectorView({
        model: uploadInstance.get('currentQuery'),
        selectionInterface: uploadInstance,
      })
    )
  },
  unselectQueriesAndResults() {
    uploadInstance.clearSelectedResults()
  },
})
