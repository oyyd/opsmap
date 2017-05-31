import { getURL } from '../touch'

describe('visit', () => {
  describe('getURL', () => {
    it('should compose url from the config and data', () => {
      const config = {
        hostname: 'opsmap.org',
        port: 8080,
      }

      const data = {
        a: 10,
        b: 'abc',
      }

      const url = getURL(config, data)

      expect(url).toBe('//opsmap.org:8080?a=10&b=abc')
    })

    it('should support array in the data', () => {
      const config = {
        hostname: 'opsmap.org',
        port: 8080,
      }

      const data = {
        a: 'c',
        b: ['d', 'e'],
      }

      const url = getURL(config, data)

      expect(url).toBe('//opsmap.org:8080?a=c&b=d&b=e')
    })
  })
})
