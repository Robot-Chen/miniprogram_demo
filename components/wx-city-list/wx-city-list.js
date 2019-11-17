Component({
    /**
   * 组件的属性列表
   */
    properties: {
        data: {
            type: Object,
            value: {},
            observer: function observer(newVal, oldVal) {
                this.resetRight(newVal);
            }
        },
        myCity: {
            type: String,
            value: ""
        },
        // 用于外部组件搜索使用
        search: {
            type: String,
            value: "",
            observer: function observer(newVal, oldVal) {
                console.log(newVal);
                this.value = newVal;
                this.searchMt();
            }
        }
    },
    data: {
        list: [],
        rightArr: [],
        // 右侧字母展示
        jumpNum: "",
        //跳转到那个字母
        myCityName: "请选择"
    },
    ready: function ready() {
        var data = this.data.data;
        this.resetRight(data);
        if (this.data.myCity) {
            this.getCity();
        }
    },
    methods: {
        // 数据重新渲染
        resetRight: function resetRight(data) {
            var rightArr = [];
            for (var i in data) {
                rightArr.push(data[i].title.substr(0, 1));
            }
            this.setData({
                list: data,
                rightArr: rightArr
            });
        },
        getCity: function getCity() {
            wx.getLocation({
                type: "wgs84",
                success: function success(res) {
                    this.latitude = res.latitude;
                    this.longitude = res.longitude;
                    // console.log(res)
                                }
            });
        },
        // 右侧字母点击事件
        jumpMt: function jumpMt(e) {
            var jumpNum = e.currentTarget.dataset.id;
            this.setData({
                jumpNum: jumpNum
            });
        },
        // 列表点击事件
        detailMt: function detailMt(e) {
            var detail = e.currentTarget.dataset.detail;
            var myEventOption = {
                bubbles: false,
                //事件是否冒泡
                composed: false,
                //事件是否可以穿越组件边界
                capturePhase: false
            };
            // 触发事件的选项
                        this.triggerEvent("detail", detail, myEventOption);
        },
        // 获取搜索输入内容
        input: function input(e) {
            this.value = e.detail.value;
        },
        // 基础搜索功能
        searchMt: function searchMt() {
            this._search();
        },
        _search: function _search() {
            console.log("搜索");
            var data = this.data.data;
            var newData = [];
            for (var i = 0; i < data.length; i++) {
                var itemArr = [];
                for (var j = 0; j < data[i].item.length; j++) {
                    if (data[i].item[j].city.indexOf(this.value) > -1) {
                        var itemJson = {};
                        for (var k in data[i].item[j]) {
                            itemJson[k] = data[i].item[j][k];
                        }
                        itemArr.push(itemJson);
                    }
                }
                if (itemArr.length === 0) {
                    continue;
                }
                newData.push({
                    title: data[i].title,
                    type: data[i].type ? data[i].type : "",
                    item: itemArr
                });
            }
            this.resetRight(newData);
        }
    }
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInd4LWNpdHktbGlzdC5qcyJdLCJuYW1lcyI6WyJDb21wb25lbnQiLCJwcm9wZXJ0aWVzIiwiZGF0YSIsInR5cGUiLCJPYmplY3QiLCJ2YWx1ZSIsIm9ic2VydmVyIiwibmV3VmFsIiwib2xkVmFsIiwicmVzZXRSaWdodCIsIm15Q2l0eSIsIlN0cmluZyIsInNlYXJjaCIsImNvbnNvbGUiLCJsb2ciLCJzZWFyY2hNdCIsImxpc3QiLCJyaWdodEFyciIsImp1bXBOdW0iLCJteUNpdHlOYW1lIiwicmVhZHkiLCJnZXRDaXR5IiwibWV0aG9kcyIsImkiLCJwdXNoIiwidGl0bGUiLCJzdWJzdHIiLCJzZXREYXRhIiwid3giLCJnZXRMb2NhdGlvbiIsInN1Y2Nlc3MiLCJyZXMiLCJsYXRpdHVkZSIsImxvbmdpdHVkZSIsImp1bXBNdCIsImUiLCJjdXJyZW50VGFyZ2V0IiwiZGF0YXNldCIsImlkIiwiZGV0YWlsTXQiLCJkZXRhaWwiLCJteUV2ZW50T3B0aW9uIiwiYnViYmxlcyIsImNvbXBvc2VkIiwiY2FwdHVyZVBoYXNlIiwidHJpZ2dlckV2ZW50IiwiaW5wdXQiLCJfc2VhcmNoIiwibmV3RGF0YSIsImxlbmd0aCIsIml0ZW1BcnIiLCJqIiwiaXRlbSIsImNpdHkiLCJpbmRleE9mIiwiaXRlbUpzb24iLCJrIl0sIm1hcHBpbmdzIjoiOztBQUFBQSxVQUFVO0FBQ1I7OztBQUdBQyxjQUFZO0FBQ1ZDLFVBQU07QUFDSkMsWUFBTUMsTUFERjtBQUVKQyxhQUFPLEVBRkg7QUFHSkMsZ0JBQVUsa0JBQVNDLE1BQVQsRUFBaUJDLE1BQWpCLEVBQXlCO0FBQ2pDLGFBQUtDLFVBQUwsQ0FBZ0JGLE1BQWhCO0FBQ0Q7QUFMRyxLQURJO0FBUVZHLFlBQVE7QUFDTlAsWUFBTVEsTUFEQTtBQUVOTixhQUFPO0FBRkQsS0FSRTtBQVlWO0FBQ0FPLFlBQVE7QUFDTlQsWUFBTVEsTUFEQTtBQUVOTixhQUFPLEVBRkQ7QUFHTkMsZ0JBQVUsa0JBQVNDLE1BQVQsRUFBaUJDLE1BQWpC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akQsZ0JBQUlrRCxXQUFXLEVBQWY7QUFDQSxpQkFBSyxJQUFJQyxDQUFULElBQWN0RCxLQUFLcUIsQ0FBTCxFQUFRNkIsSUFBUixDQUFhRCxDQUFiLENBQWQsRUFBK0I7QUFDN0JJLHVCQUFTQyxDQUFULElBQWN0RCxLQUFLcUIsQ0FBTCxFQUFRNkIsSUFBUixDQUFhRCxDQUFiLEVBQWdCSyxDQUFoQixDQUFkO0FBQ0Q7QUFDRE4sb0JBQVExQixJQUFSLENBQWErQixRQUFiO0FBQ0Q7QUFDRjtBQUNELFlBQUlMLFFBQVFELE1BQVIsS0FBbUIsQ0FBdkIsRUFBMEI7QUFDeEI7QUFDRDtBQUNERCxnQkFBUXhCLElBQVIsQ0FBYTtBQUNYQyxpQkFBT3ZCLEtBQUtxQixDQUFMLEVBQVFFLEtBREo7QUFFWHRCLGdCQUFNRCxLQUFLcUIsQ0FBTCxFQUFRcEIsSUFBUixHQUFlRCxLQUFLcUIsQ0FBTCxFQUFRcEIsSUFBdkIsR0FBOEIsRUFGekI7QUFHWGlELGdCQUFNRjtBQUhLLFNBQWI7QUFLRDtBQUNELFdBQUt6QyxVQUFMLENBQWdCdUMsT0FBaEI7QUFDRDtBQXhFTTtBQTFDRCxDQUFWIiwiZmlsZSI6Ind4LWNpdHktbGlzdC5qcyIsInNvdXJjZXNDb250ZW50IjpbIkNvbXBvbmVudCh7XG4gIC8qKlxuICAgKiDnu4Tku7bnmoTlsZ7mgKfliJfooahcbiAgICovXG4gIHByb3BlcnRpZXM6IHtcbiAgICBkYXRhOiB7XG4gICAgICB0eXBlOiBPYmplY3QsXG4gICAgICB2YWx1ZToge30sXG4gICAgICBvYnNlcnZlcjogZnVuY3Rpb24obmV3VmFsLCBvbGRWYWwpIHtcbiAgICAgICAgdGhpcy5yZXNldFJpZ2h0KG5ld1ZhbCk7XG4gICAgICB9XG4gICAgfSxcbiAgICBteUNpdHk6IHtcbiAgICAgIHR5cGU6IFN0cmluZyxcbiAgICAgIHZhbHVlOiAnJ1xuICAgIH0sXG4gICAgLy8g55So5LqO5aSW6YOo57uE5Lu25pCc57Si5L2/55SoXG4gICAgc2VhcmNoOiB7XG4gICAgICB0eXBlOiBTdHJpbmcsXG4gICAgICB2YWx1ZTogJycsXG4gICAgICBvYnNlcnZlcjogZnVuY3Rpb24obmV3VmFsLCBvbGRWYWwpIHtcbiAgICAgICAgY29uc29sZS5sb2cobmV3VmFsKTtcbiAgICAgICAgdGhpcy52YWx1ZSA9IG5ld1ZhbDtcbiAgICAgICAgdGhpcy5zZWFyY2hNdCgpO1xuICAgICAgfVxuICAgIH1cbiAgfSxcblxuICBkYXRhOiB7XG4gICAgbGlzdDogW10sXG4gICAgcmlnaHRBcnI6IFtdLC8vIOWPs+S+p+Wtl+avjeWxleekulxuICAgIGp1bXBOdW06ICcnLC8v6Lez6L2s5Yiw6YKj5Liq5a2X5q+NXG4gICAgbXlDaXR5TmFtZTogJ+ivt+mAieaLqScgLy8g6buY6K6k5oiR55qE5Z+O5biCXG5cbiAgfSxcbiAgcmVhZHkoKSB7XG4gICAgbGV0IGRhdGEgPSB0aGlzLmRhdGEuZGF0YTtcbiAgICB0aGlzLnJlc2V0UmlnaHQoZGF0YSk7XG4gICAgaWYgKHRoaXMuZGF0YS5teUNpdHkpIHtcbiAgICAgIHRoaXMuZ2V0Q2l0eSgpO1xuICAgIH1cbiAgfSxcbiAgbWV0aG9kczoge1xuICAgIC8vIOaVsOaNrumHjeaWsOa4suafk1xuICAgIHJlc2V0UmlnaHQoZGF0YSkge1xuICAgICAgbGV0IHJpZ2h0QXJyID0gW107XG4gICAgICBmb3IgKGxldCBpIGluIGRhdGEpIHtcbiAgICAgICAgcmlnaHRBcnIucHVzaChkYXRhW2ldLnRpdGxlLnN1YnN0cigwLCAxKSk7XG4gICAgICB9XG4gICAgICB0aGlzLnNldERhdGEoe1xuICAgICAgICBsaXN0OiBkYXRhLFxuICAgICAgICByaWdodEFyclxuICAgICAgfSk7XG4gICAgfSxcbiAgICBnZXRDaXR5KCkge1xuICAgICAgd3guZ2V0TG9jYXRpb24oe1xuICAgICAgICB0eXBlOiAnd2dzODQnLFxuICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbihyZXMpIHtcbiAgICAgICAgICB0aGlzLmxhdGl0dWRlID0gcmVzLmxhdGl0dWRlO1xuICAgICAgICAgIHRoaXMubG9uZ2l0dWRlID0gcmVzLmxvbmdpdHVkZTtcbiAgICAgICAgICAvLyBjb25zb2xlLmxvZyhyZXMpXG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0sXG4gICAgLy8g5Y+z5L6n5a2X5q+N54K55Ye75LqL5Lu2XG4gICAganVtcE10KGUpIHtcbiAgICAgIGxldCBqdW1wTnVtID0gZS5jdXJyZW50VGFyZ2V0LmRhdGFzZXQuaWQ7XG4gICAgICB0aGlzLnNldERhdGEoeyBqdW1wTnVtIH0pO1xuICAgIH0sXG4gICAgLy8g5YiX6KGo54K55Ye75LqL5Lu2XG4gICAgZGV0YWlsTXQoZSkge1xuICAgICAgbGV0IGRldGFpbCA9IGUuY3VycmVudFRhcmdldC5kYXRhc2V0LmRldGFpbDtcblxuICAgICAgbGV0IG15RXZlbnRPcHRpb24gPSB7XG4gICAgICAgIGJ1YmJsZXM6IGZhbHNlLC8v5LqL5Lu25piv5ZCm5YaS5rOhXG4gICAgICAgIGNvbXBvc2VkOiBmYWxzZSwvL+S6i+S7tuaYr+WQpuWPr+S7peepv+i2iue7hOS7tui+ueeVjFxuICAgICAgICBjYXB0dXJlUGhhc2U6IGZhbHNlIC8v5LqL5Lu25piv5ZCm5oul5pyJ5o2V6I636Zi25q61XG4gICAgICB9OyAvLyDop6blj5Hkuovku7bnmoTpgInpoblcbiAgICAgIHRoaXMudHJpZ2dlckV2ZW50KCdkZXRhaWwnLCBkZXRhaWwsIG15RXZlbnRPcHRpb24pO1xuXG4gICAgfSxcbiAgICAvLyDojrflj5bmkJzntKLovpPlhaXlhoXlrrlcbiAgICBpbnB1dChlKSB7XG4gICAgICB0aGlzLnZhbHVlID0gZS5kZXRhaWwudmFsdWU7XG4gICAgfSxcbiAgICAvLyDln7rnoYDmkJzntKLlip/og71cbiAgICBzZWFyY2hNdCgpIHtcbiAgICAgIHRoaXMuX3NlYXJjaCgpO1xuICAgIH0sXG4gICAgX3NlYXJjaCgpIHtcbiAgICAgIGNvbnNvbGUubG9nKCfmkJzntKInKTtcbiAgICAgIGxldCBkYXRhID0gdGhpcy5kYXRhLmRhdGE7XG4gICAgICBsZXQgbmV3RGF0YSA9IFtdO1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBkYXRhLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGxldCBpdGVtQXJyID0gW107XG4gICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgZGF0YVtpXS5pdGVtLmxlbmd0aDsgaisrKSB7XG4gICAgICAgICAgaWYgKGRhdGFbaV0uaXRlbVtqXS5jaXR5LmluZGV4T2YodGhpcy52YWx1ZSkgPiAtMSkge1xuICAgICAgICAgICAgbGV0IGl0ZW1Kc29uID0ge307XG4gICAgICAgICAgICBmb3IgKGxldCBrIGluIGRhdGFbaV0uaXRlbVtqXSkge1xuICAgICAgICAgICAgICBpdGVtSnNvbltrXSA9IGRhdGFbaV0uaXRlbVtqXVtrXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGl0ZW1BcnIucHVzaChpdGVtSnNvbik7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmIChpdGVtQXJyLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG4gICAgICAgIG5ld0RhdGEucHVzaCh7XG4gICAgICAgICAgdGl0bGU6IGRhdGFbaV0udGl0bGUsXG4gICAgICAgICAgdHlwZTogZGF0YVtpXS50eXBlID8gZGF0YVtpXS50eXBlIDogJycsXG4gICAgICAgICAgaXRlbTogaXRlbUFyclxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICAgIHRoaXMucmVzZXRSaWdodChuZXdEYXRhKTtcbiAgICB9XG4gIH1cbn0pO1xuIl19