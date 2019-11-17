if (typeof Crypto == "undefined" || !Crypto.util) {
    (function() {
        var base64map = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
        // Global Crypto object
        // with browser window or with node module
                var Crypto = typeof window === "undefined" ? exports.Crypto = {} : window.Crypto = {};
        // Crypto utilities
                var util = Crypto.util = {
            // Bit-wise rotate left
            rotl: function rotl(n, b) {
                return n << b | n >>> 32 - b;
            },
            // Bit-wise rotate right
            rotr: function rotr(n, b) {
                return n << 32 - b | n >>> b;
            },
            // Swap big-endian to little-endian and vice versa
            endian: function endian(n) {
                // If number given, swap endian
                if (n.constructor == Number) {
                    return util.rotl(n, 8) & 16711935 | util.rotl(n, 24) & 4278255360;
                }
                // Else, assume array and swap all items
                                for (var i = 0; i < n.length; i++) {
                    n[i] = util.endian(n[i]);
                }
                return n;
            },
            // Generate an array of any length of random bytes
            randomBytes: function randomBytes(n) {
                for (var bytes = []; n > 0; n--) {
                    bytes.push(Math.floor(Math.random() * 256));
                }
                return bytes;
            },
            // Convert a byte array to big-endian 32-bit words
            bytesToWords: function bytesToWords(bytes) {
                for (var words = [], i = 0, b = 0; i < bytes.length; i++, b += 8) {
                    words[b >>> 5] |= (bytes[i] & 255) << 24 - b % 32;
                }
                return words;
            },
            // Convert big-endian 32-bit words to a byte array
            wordsToBytes: function wordsToBytes(words) {
                for (var bytes = [], b = 0; b < words.length * 32; b += 8) {
                    bytes.push(words[b >>> 5] >>> 24 - b % 32 & 255);
                }
                return bytes;
            },
            // Convert a byte array to a hex string
            bytesToHex: function bytesToHex(bytes) {
                for (var hex = [], i = 0; i < bytes.length; i++) {
                    hex.push((bytes[i] >>> 4).toString(16));
                    hex.push((bytes[i] & 15).toString(16));
                }
                return hex.join("");
            },
            // Convert a hex string to a byte array
            hexToBytes: function hexToBytes(hex) {
                for (var bytes = [], c = 0; c < hex.length; c += 2) {
                    bytes.push(parseInt(hex.substr(c, 2), 16));
                }
                return bytes;
            },
            // Convert a byte array to a base-64 string
            bytesToBase64: function bytesToBase64(bytes) {
                // Use browser-native function if it exists
                if (typeof btoa == "function") return btoa(Binary.bytesToString(bytes));
                for (var base64 = [], i = 0; i < bytes.length; i += 3) {
                    var triplet = bytes[i] << 16 | bytes[i + 1] << 8 | bytes[i + 2];
                    for (var j = 0; j < 4; j++) {
                        if (i * 8 + j * 6 <= bytes.length * 8) base64.push(base64map.charAt(triplet >>> 6 * (3 - j) & 63)); else base64.push("=");
                    }
                }
                return base64.join("");
            },
            // Convert a base-64 string to a byte array
            base64ToBytes: function base64ToBytes(base64) {
                // Use browser-native function if it exists
                if (typeof atob == "function") return Binary.stringToBytes(atob(base64));
                // Remove non-base-64 characters
                                base64 = base64.replace(/[^A-Z0-9+\/]/gi, "");
                for (var bytes = [], i = 0, imod4 = 0; i < base64.length; imod4 = ++i % 4) {
                    if (imod4 == 0) continue;
                    bytes.push((base64map.indexOf(base64.charAt(i - 1)) & Math.pow(2, -2 * imod4 + 8) - 1) << imod4 * 2 | base64map.indexOf(base64.charAt(i)) >>> 6 - imod4 * 2);
                }
                return bytes;
            }
        };
        // Crypto character encodings
                var charenc = Crypto.charenc = {};
        // UTF-8 encoding
                var UTF8 = charenc.UTF8 = {
            // Convert a string to a byte array
            stringToBytes: function stringToBytes(str) {
                return Binary.stringToBytes(unescape(encodeURIComponent(str)));
            },
            // Convert a byte array to a string
            bytesToString: function bytesToString(bytes) {
                return decodeURIComponent(escape(Binary.bytesToString(bytes)));
            }
        };
        // Binary encoding
                var Binary = charenc.Binary = {
            // Convert a string to a byte array
            stringToBytes: function stringToBytes(str) {
                for (var bytes = [], i = 0; i < str.length; i++) {
                    bytes.push(str.charCodeAt(i) & 255);
                }
                return bytes;
            },
            // Convert a byte array to a string
            bytesToString: function bytesToString(bytes) {
                for (var str = [], i = 0; i < bytes.length; i++) {
                    str.push(String.fromCharCode(bytes[i]));
                }
                return str.join("");
            }
        };
    })();
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkNyeXB0by5qcyJdLCJuYW1lcyI6WyJDcnlwdG8iLCJ1dGlsIiwiYmFzZTY0bWFwIiwid2luZG93IiwiZXhwb3J0cyIsInJvdGwiLCJuIiwiYiIsInJvdHIiLCJlbmRpYW4iLCJjb25zdHJ1Y3RvciIsIk51bWJlciIsImkiLCJsZW5ndGgiLCJyYW5kb21CeXRlcyIsImJ5dGVzIiwicHVzaCIsIk1hdGgiLCJmbG9vciIsInJhbmRvbSIsImJ5dGVzVG9Xb3JkcyIsIndvcmRzIiwid29yZHNUb0J5dGVzIiwiYnl0ZXNUb0hleCIsImhleCIsInRvU3RyaW5nIiwiam9pbiIsImhleFRvQnl0ZXMiLCJjIiwicGFyc2VJbnQiLCJzdWJzdHIiLCJieXRlc1RvQmFzZTY0IiwiYnRvYSIsIkJpbmFyeSIsImJ5dGVzVG9TdHJpbmciLCJiYXNlNjQiLCJ0cmlwbGV0IiwiaiIsImNoYXJBdCIsImJhc2U2NFRvQnl0ZXMiLCJhdG9iIiwic3RyaW5nVG9CeXRlcyIsInJlcGxhY2UiLCJpbW9kNCIsImluZGV4T2YiLCJwb3ciLCJjaGFyZW5jIiwiVVRGOCIsInN0ciIsInVuZXNjYXBlIiwiZW5jb2RlVVJJQ29tcG9uZW50IiwiZGVjb2RlVVJJQ29tcG9uZW50IiwiZXNjYXBlIiwiY2hhckNvZGVBdCIsIlN0cmluZyIsImZyb21DaGFyQ29kZSJdLCJtYXBwaW5ncyI6Ijs7QUFBQSxJQUFJLE9BQU9BLE1BQVAsSUFBaUIsV0FBakIsSUFBZ0MsQ0FBRUEsT0FBT0MsSUFBN0MsRUFDQTtBQUNBLEVBQUMsWUFBVTs7QUFFWCxNQUFJQyxZQUFZLGtFQUFoQjs7QUFFQTtBQUNBO0FBQ0EsTUFBSUYsU0FBVSxPQUFPRyxNQUFQLEtBQWtCLFdBQW5CLEdBQWtDQyxRQUFRSixNQUFSLEdBQWlCLEVBQW5ELEdBQXdERyxPQUFPSCxNQUFQLEdBQWdCLEVBQXJGOztBQUVBO0FBQ0EsTUFBSUMsT0FBT0QsT0FBT0MsSUFBUCxHQUFjOztBQUV4QjtBQUNBSSxTQUFNLGNBQVVDLENBQVYsRUFBYUMs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O0FBQ0NHLFdBQU1DLElBQU4sQ0FBV2dDLElBQUlLLFVBQUosQ0FBZXpDLENBQWYsSUFBb0IsSUFBL0I7QUFERCxLQUVBLE9BQU9HLEtBQVA7QUFDQSxJQVA0Qjs7QUFTN0I7QUFDQW1CLGtCQUFlLHVCQUFVbkIsS0FBVixFQUFpQjtBQUMvQixTQUFLLElBQUlpQyxNQUFNLEVBQVYsRUFBY3BDLElBQUksQ0FBdkIsRUFBMEJBLElBQUlHLE1BQU1GLE1BQXBDLEVBQTRDRCxHQUE1QztBQUNDb0MsU0FBSWhDLElBQUosQ0FBU3NDLE9BQU9DLFlBQVAsQ0FBb0J4QyxNQUFNSCxDQUFOLENBQXBCLENBQVQ7QUFERCxLQUVBLE9BQU9vQyxJQUFJdEIsSUFBSixDQUFTLEVBQVQsQ0FBUDtBQUNBOztBQWQ0QixHQUE5QjtBQWtCQyxFQXZKRDtBQXdKQyIsImZpbGUiOiJDcnlwdG8uanMiLCJzb3VyY2VzQ29udGVudCI6WyJpZiAodHlwZW9mIENyeXB0byA9PSBcInVuZGVmaW5lZFwiIHx8ICEgQ3J5cHRvLnV0aWwpXHJcbntcclxuKGZ1bmN0aW9uKCl7XHJcblxyXG52YXIgYmFzZTY0bWFwID0gXCJBQkNERUZHSElKS0xNTk9QUVJTVFVWV1hZWmFiY2RlZmdoaWprbG1ub3BxcnN0dXZ3eHl6MDEyMzQ1Njc4OSsvXCI7XHJcblxyXG4vLyBHbG9iYWwgQ3J5cHRvIG9iamVjdFxyXG4vLyB3aXRoIGJyb3dzZXIgd2luZG93IG9yIHdpdGggbm9kZSBtb2R1bGVcclxudmFyIENyeXB0byA9ICh0eXBlb2Ygd2luZG93ID09PSAndW5kZWZpbmVkJykgPyBleHBvcnRzLkNyeXB0byA9IHt9IDogd2luZG93LkNyeXB0byA9IHt9OyBcclxuXHJcbi8vIENyeXB0byB1dGlsaXRpZXNcclxudmFyIHV0aWwgPSBDcnlwdG8udXRpbCA9IHtcclxuXHJcblx0Ly8gQml0LXdpc2Ugcm90YXRlIGxlZnRcclxuXHRyb3RsOiBmdW5jdGlvbiAobiwgYikge1xyXG5cdFx0cmV0dXJuIChuIDw8IGIpIHwgKG4gPj4+ICgzMiAtIGIpKTtcclxuXHR9LFxyXG5cclxuXHQvLyBCaXQtd2lzZSByb3RhdGUgcmlnaHRcclxuXHRyb3RyOiBmdW5jdGlvbiAobiwgYikge1xyXG5cdFx0cmV0dXJuIChuIDw8ICgzMiAtIGIpKSB8IChuID4+PiBiKTtcclxuXHR9LFxyXG5cclxuXHQvLyBTd2FwIGJpZy1lbmRpYW4gdG8gbGl0dGxlLWVuZGlhbiBhbmQgdmljZSB2ZXJzYVxyXG5cdGVuZGlhbjogZnVuY3Rpb24gKG4pIHtcclxuXHJcblx0XHQvLyBJZiBudW1iZXIgZ2l2ZW4sIHN3YXAgZW5kaWFuXHJcblx0XHRpZiAobi5jb25zdHJ1Y3RvciA9PSBOdW1iZXIpIHtcclxuXHRcdFx0cmV0dXJuIHV0aWwucm90bChuLCAgOCkgJiAweDAwRkYwMEZGIHxcclxuXHRcdFx0ICAgICAgIHV0aWwucm90bChuLCAyNCkgJiAweEZGMDBGRjAwO1xyXG5cdFx0fVxyXG5cclxuXHRcdC8vIEVsc2UsIGFzc3VtZSBhcnJheSBhbmQgc3dhcCBhbGwgaXRlbXNcclxuXHRcdGZvciAodmFyIGkgPSAwOyBpIDwgbi5sZW5ndGg7IGkrKylcclxuXHRcdFx0bltpXSA9IHV0aWwuZW5kaWFuKG5baV0pO1xyXG5cdFx0cmV0dXJuIG47XHJcblxyXG5cdH0sXHJcblxyXG5cdC8vIEdlbmVyYXRlIGFuIGFycmF5IG9mIGFueSBsZW5ndGggb2YgcmFuZG9tIGJ5dGVzXHJcblx0cmFuZG9tQnl0ZXM6IGZ1bmN0aW9uIChuKSB7XHJcblx0XHRmb3IgKHZhciBieXRlcyA9IFtdOyBuID4gMDsgbi0tKVxyXG5cdFx0XHRieXRlcy5wdXNoKE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDI1NikpO1xyXG5cdFx0cmV0dXJuIGJ5dGVzO1xyXG5cdH0sXHJcblxyXG5cdC8vIENvbnZlcnQgYSBieXRlIGFycmF5IHRvIGJpZy1lbmRpYW4gMzItYml0IHdvcmRzXHJcblx0Ynl0ZXNUb1dvcmRzOiBmdW5jdGlvbiAoYnl0ZXMpIHtcclxuXHRcdGZvciAodmFyIHdvcmRzID0gW10sIGkgPSAwLCBiID0gMDsgaSA8IGJ5dGVzLmxlbmd0aDsgaSsrLCBiICs9IDgpXHJcblx0XHRcdHdvcmRzW2IgPj4+IDVdIHw9IChieXRlc1tpXSAmIDB4RkYpIDw8ICgyNCAtIGIgJSAzMik7XHJcblx0XHRyZXR1cm4gd29yZHM7XHJcblx0fSxcclxuXHJcblx0Ly8gQ29udmVydCBiaWctZW5kaWFuIDMyLWJpdCB3b3JkcyB0byBhIGJ5dGUgYXJyYXlcclxuXHR3b3Jkc1RvQnl0ZXM6IGZ1bmN0aW9uICh3b3Jkcykge1xyXG5cdFx0Zm9yICh2YXIgYnl0ZXMgPSBbXSwgYiA9IDA7IGIgPCB3b3Jkcy5sZW5ndGggKiAzMjsgYiArPSA4KVxyXG5cdFx0XHRieXRlcy5wdXNoKCh3b3Jkc1tiID4+PiA1XSA+Pj4gKDI0IC0gYiAlIDMyKSkgJiAweEZGKTtcclxuXHRcdHJldHVybiBieXRlcztcclxuXHR9LFxyXG5cclxuXHQvLyBDb252ZXJ0IGEgYnl0ZSBhcnJheSB0byBhIGhleCBzdHJpbmdcclxuXHRieXRlc1RvSGV4OiBmdW5jdGlvbiAoYnl0ZXMpIHtcclxuXHRcdGZvciAodmFyIGhleCA9IFtdLCBpID0gMDsgaSA8IGJ5dGVzLmxlbmd0aDsgaSsrKSB7XHJcblx0XHRcdGhleC5wdXNoKChieXRlc1tpXSA+Pj4gNCkudG9TdHJpbmcoMTYpKTtcclxuXHRcdFx0aGV4LnB1c2goKGJ5dGVzW2ldICYgMHhGKS50b1N0cmluZygxNikpO1xyXG5cdFx0fVxyXG5cdFx0cmV0dXJuIGhleC5qb2luKFwiXCIpO1xyXG5cdH0sXHJcblxyXG5cdC8vIENvbnZlcnQgYSBoZXggc3RyaW5nIHRvIGEgYnl0ZSBhcnJheVxyXG5cdGhleFRvQnl0ZXM6IGZ1bmN0aW9uIChoZXgpIHtcclxuXHRcdGZvciAodmFyIGJ5dGVzID0gW10sIGMgPSAwOyBjIDwgaGV4Lmxlbmd0aDsgYyArPSAyKVxyXG5cdFx0XHRieXRlcy5wdXNoKHBhcnNlSW50KGhleC5zdWJzdHIoYywgMiksIDE2KSk7XHJcblx0XHRyZXR1cm4gYnl0ZXM7XHJcblx0fSxcclxuXHJcblx0Ly8gQ29udmVydCBhIGJ5dGUgYXJyYXkgdG8gYSBiYXNlLTY0IHN0cmluZ1xyXG5cdGJ5dGVzVG9CYXNlNjQ6IGZ1bmN0aW9uIChieXRlcykge1xyXG5cclxuXHRcdC8vIFVzZSBicm93c2VyLW5hdGl2ZSBmdW5jdGlvbiBpZiBpdCBleGlzdHNcclxuXHRcdGlmICh0eXBlb2YgYnRvYSA9PSBcImZ1bmN0aW9uXCIpIHJldHVybiBidG9hKEJpbmFyeS5ieXRlc1RvU3RyaW5nKGJ5dGVzKSk7XHJcblxyXG5cdFx0Zm9yKHZhciBiYXNlNjQgPSBbXSwgaSA9IDA7IGkgPCBieXRlcy5sZW5ndGg7IGkgKz0gMykge1xyXG5cdFx0XHR2YXIgdHJpcGxldCA9IChieXRlc1tpXSA8PCAxNikgfCAoYnl0ZXNbaSArIDFdIDw8IDgpIHwgYnl0ZXNbaSArIDJdO1xyXG5cdFx0XHRmb3IgKHZhciBqID0gMDsgaiA8IDQ7IGorKykge1xyXG5cdFx0XHRcdGlmIChpICogOCArIGogKiA2IDw9IGJ5dGVzLmxlbmd0aCAqIDgpXHJcblx0XHRcdFx0XHRiYXNlNjQucHVzaChiYXNlNjRtYXAuY2hhckF0KCh0cmlwbGV0ID4+PiA2ICogKDMgLSBqKSkgJiAweDNGKSk7XHJcblx0XHRcdFx0ZWxzZSBiYXNlNjQucHVzaChcIj1cIik7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gYmFzZTY0LmpvaW4oXCJcIik7XHJcblxyXG5cdH0sXHJcblxyXG5cdC8vIENvbnZlcnQgYSBiYXNlLTY0IHN0cmluZyB0byBhIGJ5dGUgYXJyYXlcclxuXHRiYXNlNjRUb0J5dGVzOiBmdW5jdGlvbiAoYmFzZTY0KSB7XHJcblxyXG5cdFx0Ly8gVXNlIGJyb3dzZXItbmF0aXZlIGZ1bmN0aW9uIGlmIGl0IGV4aXN0c1xyXG5cdFx0aWYgKHR5cGVvZiBhdG9iID09IFwiZnVuY3Rpb25cIikgcmV0dXJuIEJpbmFyeS5zdHJpbmdUb0J5dGVzKGF0b2IoYmFzZTY0KSk7XHJcblxyXG5cdFx0Ly8gUmVtb3ZlIG5vbi1iYXNlLTY0IGNoYXJhY3RlcnNcclxuXHRcdGJhc2U2NCA9IGJhc2U2NC5yZXBsYWNlKC9bXkEtWjAtOStcXC9dL2lnLCBcIlwiKTtcclxuXHJcblx0XHRmb3IgKHZhciBieXRlcyA9IFtdLCBpID0gMCwgaW1vZDQgPSAwOyBpIDwgYmFzZTY0Lmxlbmd0aDsgaW1vZDQgPSArK2kgJSA0KSB7XHJcblx0XHRcdGlmIChpbW9kNCA9PSAwKSBjb250aW51ZTtcclxuXHRcdFx0Ynl0ZXMucHVzaCgoKGJhc2U2NG1hcC5pbmRleE9mKGJhc2U2NC5jaGFyQXQoaSAtIDEpKSAmIChNYXRoLnBvdygyLCAtMiAqIGltb2Q0ICsgOCkgLSAxKSkgPDwgKGltb2Q0ICogMikpIHxcclxuXHRcdFx0ICAgICAgICAgICAoYmFzZTY0bWFwLmluZGV4T2YoYmFzZTY0LmNoYXJBdChpKSkgPj4+ICg2IC0gaW1vZDQgKiAyKSkpO1xyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiBieXRlcztcclxuXHJcblx0fVxyXG5cclxufTtcclxuXHJcbi8vIENyeXB0byBjaGFyYWN0ZXIgZW5jb2RpbmdzXHJcbnZhciBjaGFyZW5jID0gQ3J5cHRvLmNoYXJlbmMgPSB7fTtcclxuXHJcbi8vIFVURi04IGVuY29kaW5nXHJcbnZhciBVVEY4ID0gY2hhcmVuYy5VVEY4ID0ge1xyXG5cclxuXHQvLyBDb252ZXJ0IGEgc3RyaW5nIHRvIGEgYnl0ZSBhcnJheVxyXG5cdHN0cmluZ1RvQnl0ZXM6IGZ1bmN0aW9uIChzdHIpIHtcclxuXHRcdHJldHVybiBCaW5hcnkuc3RyaW5nVG9CeXRlcyh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoc3RyKSkpO1xyXG5cdH0sXHJcblxyXG5cdC8vIENvbnZlcnQgYSBieXRlIGFycmF5IHRvIGEgc3RyaW5nXHJcblx0Ynl0ZXNUb1N0cmluZzogZnVuY3Rpb24gKGJ5dGVzKSB7XHJcblx0XHRyZXR1cm4gZGVjb2RlVVJJQ29tcG9uZW50KGVzY2FwZShCaW5hcnkuYnl0ZXNUb1N0cmluZyhieXRlcykpKTtcclxuXHR9XHJcblxyXG59O1xyXG5cclxuLy8gQmluYXJ5IGVuY29kaW5nXHJcbnZhciBCaW5hcnkgPSBjaGFyZW5jLkJpbmFyeSA9IHtcclxuXHJcblx0Ly8gQ29udmVydCBhIHN0cmluZyB0byBhIGJ5dGUgYXJyYXlcclxuXHRzdHJpbmdUb0J5dGVzOiBmdW5jdGlvbiAoc3RyKSB7XHJcblx0XHRmb3IgKHZhciBieXRlcyA9IFtdLCBpID0gMDsgaSA8IHN0ci5sZW5ndGg7IGkrKylcclxuXHRcdFx0Ynl0ZXMucHVzaChzdHIuY2hhckNvZGVBdChpKSAmIDB4RkYpO1xyXG5cdFx0cmV0dXJuIGJ5dGVzO1xyXG5cdH0sXHJcblxyXG5cdC8vIENvbnZlcnQgYSBieXRlIGFycmF5IHRvIGEgc3RyaW5nXHJcblx0Ynl0ZXNUb1N0cmluZzogZnVuY3Rpb24gKGJ5dGVzKSB7XHJcblx0XHRmb3IgKHZhciBzdHIgPSBbXSwgaSA9IDA7IGkgPCBieXRlcy5sZW5ndGg7IGkrKylcclxuXHRcdFx0c3RyLnB1c2goU3RyaW5nLmZyb21DaGFyQ29kZShieXRlc1tpXSkpO1xyXG5cdFx0cmV0dXJuIHN0ci5qb2luKFwiXCIpO1xyXG5cdH1cclxuXHJcbn07XHJcblxyXG59KSgpO1xyXG59XHJcbiJdfQ==