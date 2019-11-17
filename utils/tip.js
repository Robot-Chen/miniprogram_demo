var showToast = function showToast(message, that, time) {
    if (!time) {
        time = 2e3;
    }
    that.showtoastData = {
        title: message,
        duration: time,
        isShow: true
    };
    that.$apply();
    setTimeout(function(res) {
        var animation = wx.createAnimation({
            opacity: 1,
            duration: 3e3,
            timingFunction: "linear"
        });
        that.showtoastData.isShow = false;
        that.animationData = animation.export;
        that.$apply();
    }, that.showtoastData.duration);
};

module.exports = {
    showToast: showToast
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRpcC5qcyJdLCJuYW1lcyI6WyJzaG93VG9hc3QiLCJtZXNzYWdlIiwidGhhdCIsInRpbWUiLCJzaG93dG9hc3REYXRhIiwidGl0bGUiLCJkdXJhdGlvbiIsImlzU2hvdyIsIiRhcHBseSIsInNldFRpbWVvdXQiLCJhbmltYXRpb24iLCJ3eCIsImNyZWF0ZUFuaW1hdGlvbiIsIm9wYWNpdHkiLCJ0aW1pbmdGdW5jdGlvbiIsImFuaW1hdGlvbkRhdGEiLCJleHBvcnQiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiOztBQUFBLElBQU1BLFlBQVksU0FBWkEsU0FBWSxDQUFDQyxPQUFELEVBQVNDLElBQVQsRUFBZUMsSUFBZixFQUF3QjtBQUN4QyxNQUFJLENBQUNBLElBQUwsRUFBVztBQUNUQSxXQUFPLElBQVA7QUFDRDtBQUNERCxPQUFLRSxhQUFMLEdBQXFCO0FBQ25CQyxXQUFPSixPQURZO0FBRW5CSyxjQUFVSCxJQUZTO0FBR25CSSxZQUFRO0FBSFcsR0FBckI7QUFLQUwsT0FBS00sTUFBTDtBQUNBQyxhQUFXLGVBQU87QUFDaEIsUUFBSUMsWUFBWUMsR0FBR0MsZUFBSCxDQUFtQjtBQUNqQ0MsZUFBUyxDQUR3QjtBQUVqQ1AsZ0JBQVUsSUFGdUI7QUFHakNRLHNCQUFnQjtBQUhpQixLQUFuQixDQUFoQjtBQUtBWixTQUFLRSxhQUFMLENBQW1CRyxNQUFuQixHQUE0QixLQUE1QjtBQUNBTCxTQUFLYSxhQUFMLEdBQXFCTCxVQUFVTSxNQUEvQjtBQUNBZCxTQUFLTSxNQUFMO0FBQ0QsR0FURCxFQVNFTixLQUFLRSxhQUFMLENBQW1CRSxRQVRyQjtBQVVELENBcEJEOztBQXNCQVcsT0FBT0MsT0FBUCxHQUFpQjtBQUNmbEI7QUFEZSxDQUFqQiIsImZpbGUiOiJ0aXAuanMiLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBzaG93VG9hc3QgPSAobWVzc2FnZSx0aGF0LCB0aW1lKSA9PiB7XG4gIGlmICghdGltZSkge1xuICAgIHRpbWUgPSAyMDAwXG4gIH1cbiAgdGhhdC5zaG93dG9hc3REYXRhID0ge1xuICAgIHRpdGxlOiBtZXNzYWdlLFxuICAgIGR1cmF0aW9uOiB0aW1lLFxuICAgIGlzU2hvdzogdHJ1ZVxuICB9XG4gIHRoYXQuJGFwcGx5KCk7XG4gIHNldFRpbWVvdXQocmVzID0+IHtcbiAgICBsZXQgYW5pbWF0aW9uID0gd3guY3JlYXRlQW5pbWF0aW9uKHtcbiAgICAgIG9wYWNpdHk6IDEsXG4gICAgICBkdXJhdGlvbjogMzAwMCxcbiAgICAgIHRpbWluZ0Z1bmN0aW9uOiAnbGluZWFyJ1xuICAgIH0pXG4gICAgdGhhdC5zaG93dG9hc3REYXRhLmlzU2hvdyA9IGZhbHNlO1xuICAgIHRoYXQuYW5pbWF0aW9uRGF0YSA9IGFuaW1hdGlvbi5leHBvcnQ7XG4gICAgdGhhdC4kYXBwbHkoKTtcbiAgfSx0aGF0LnNob3d0b2FzdERhdGEuZHVyYXRpb24pXG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBzaG93VG9hc3Rcbn1cbiJdfQ==